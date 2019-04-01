import {installGame} from "zig-js/integration/game-window";
import {Connector} from "zig-js/integration/connector";
import {MoneyAmount} from "zig-js/common/domain";
import {createCustomOverlay} from "./overlay";

window.onload = async () => {
    // TODO: for debugging, remove in production
    localStorage.setItem("kv.logging", "true");


    // Default ZIG overlay
    // const updateUIState = installOverlay(document.querySelector("#overlayContainer"));

    // custom overlay implementation. The updateUIState is a function that displays the
    // current ui state over the game.
    const updateUIState = createCustomOverlay(document.querySelector("#overlayContainer"));

    const gameConfig = {
        canonicalGameName: "dickehose",
        isTestStage: true,
        locale: "de_DE",
    };

    const game = installGame({
        container: document.querySelector("#gameContainer"),
        url: "https://mylotto24.frontend.zig.services/dickehose/latest/tipp24_com/game/outer.html",
        gameConfig: gameConfig,
        connector: new FakeConnector(updateUIState),
        baseTicketPrice: MoneyAmount.of(150, "EUR"),
    });

    await game.initialize();
};

class FakeConnector extends Connector {
    constructor(updateUIState) {
        super();
        this._updateUIState = updateUIState;
    }

    async fetchCustomerState() {
        return {
            loggedIn: true,
            balance: MoneyAmount.of(1000, "EUR"),
        };
    }

    async showErrorDialog(error) {
        alert(JSON.stringify(error, null, 2));
    }

    updateUIState(uiState, game) {
        this._updateUIState(uiState, game);
    }

    get allowFullscreen() {
        return false;
    }
}
