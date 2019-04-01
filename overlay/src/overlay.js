function formatAmount(moneyAmount) {
    const amount = moneyAmount.amountInMajor;

    return amount.toLocaleString("de-DE", {
        currency: moneyAmount.currency,
        style: "currency",
    })
}


export function createCustomOverlay(target) {
    target.innerHTML = "";

    let game = undefined;

    target.addEventListener("click", event => {
        if (!game || event.target.id !== "playDemoButton")
            return;

        game.playDemoGame();
    });

    // This method gets called by the integration on every update of the ui state.
    // You can use that to re-configure the UI to show the state in the way you
    // need it to.
    return (uiState, currentGame) => {
        game = currentGame;

        // maybe show or hide the overlay, depending on the state.
        if (uiState.buttonType === "loading" || uiState.buttonType === "none") {
            target.style.display = "none";
            return
        }

        target.style.display = "block";

        target.innerHTML = `
            <div class="custom-overlay">
                <h1>Price per game: ${formatAmount(uiState.normalTicketPrice)}</h1>
                <div><button id="playDemoButton">Start demo game</button></div>
                <div>Current ui state is: ${JSON.stringify(uiState)}</div>
            </div>
        `;
    };
}
