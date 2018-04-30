import { GameService } from "./game.service";
import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Game service', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ GameService ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(GameService);
    service.players = [];
    httpMock = TestBed.get(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('Must emit boolean when gameInit is called', () => {
    let initTest;
    service.gameInit.subscribe(
      init => {
        initTest = init;
      }
    );
    service.setGameInit(true);
    expect(initTest).toBe(true);
  });
  it('Must set player 1 name', () => {
    const playerName = 'Aneke';
    service.setPlayer(1, playerName);
    expect(service.players[1].name).toBe(playerName);
  });
  it('Must set player 1 choice', () => {
    const playerChoice = 'rock';
    service.players = [null, { name: 'Mike' }];
    service.setChoice(1, playerChoice);
    expect(service.players[1].choice).toBe(playerChoice);
  });
  it('Return winner name', () => {
    service.rules = [
      { "option": "rock", "beat": "scissors", "iconClass": "far fa-hand-rock" },
      { "option": "scissors", "beat": "paper", "iconClass": "far fa-hand-scissors" },
      { "option": "paper", "beat": "rock", "iconClass": "far fa-hand-paper" }
    ];
    service.players = [null, { name: 'Mike', choice: 'scissors' }, { name: 'Floor', choice: 'paper' }];
    expect(service.winnerIs()).toBe(service.players[1].name);
  });
  it('Must recibe rules set from BE', () => {
    const dummyRules = [
      { "option": "rock", "beat": "scissors", "iconClass": "far fa-hand-rock" },
      { "option": "scissors", "beat": "paper", "iconClass": "far fa-hand-scissors" },
      { "option": "paper", "beat": "rock", "iconClass": "far fa-hand-paper" }
    ];

    service.getRules$().subscribe(rules => {
      expect(rules.length).toBe(3);
      expect(rules).toEqual(dummyRules);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/game/rules`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyRules);
  });
  it('Must Update scores on BE', () => {
    const dumyResponse = {
      status: 'ok'
    }
    service.winnerToStats$().subscribe(
      response => {
        expect(response).toBe(dumyResponse);
      }
    );

    const req = httpMock.expectOne(`http://localhost:8080/api/game/stats`);
    expect(req.request.method).toBe('PUT');
    req.flush(dumyResponse);
  });
  it('Must recibe stats from BE', () => {
    const dummyStats = [
      {"player":"Floor","score":"23"},
      {"player":"Mike","score":"21"} ];

    service.getStats$().subscribe(
      stats => {
        expect(stats.length).toBe(2);
        expect(stats).toBe(dummyStats);
      }
    );

    const req = httpMock.expectOne(`http://localhost:8080/api/game/stats`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStats);
  })
});
