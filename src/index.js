import {Zig} from "zig-js/zig/zig";

window.onload = async () => {
    // TODO: for debugging, remove in production
    localStorage.setItem("kv.logging", "true");

    // wait for zig-js to be ready.
    await Zig.ready();

    // log all messages during development:
    Zig.Client.Messages.messageClient.register(logEvent);

    // wait for the player to start the game
    Zig.Client.Messages.registerGeneric({
        async playGame() {
            Game.runGame(Zig.Client.buyTicket());
        },

        async playDemoGame() {
            Game.runGame(Zig.Client.demoTicket())
        },
    });

    Zig.Client.Messages.gameLoaded();
};

const Game = {
    async runGame(ticket$) {
        // get the ticket
        const ticket = await ticket$;

        // now handle the game.
        // you should handle errors, similar to this:
        try {
            await Game.play(ticket)
        } catch (err) {
            Zig.Client.Messages.error(err)
        }

        // settle the ticket.
        await Zig.Client.settleTicket(ticket.id);

        // tell the parent that the game has finish
        Zig.Client.Messages.gameFinished();
    },

    async play(ticket) {
        console.log("Playing ticket:", ticket);
    },
};

function logEvent(event) {
    const div = document.createElement("div");
    div.innerText = JSON.stringify(event);
    document.querySelector("#events").appendChild(div);
}
