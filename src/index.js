import {Zig} from "zig-js/libzig";

// TODO: for debugging, remove in production
localStorage.setItem("kv.logging", "true");

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

const Game = {
    async runGame(ticket$) {
        // get the ticket
        const ticket = await ticket$;

        // // you should handle errors, similar to this:
        // try {
        //     // await ...
        // } catch(err) {
        //     Zig.Client.Messages.error(err)
        // }

        // let the customer play the ticket
        console.log("Got ticket from backend:", ticket);

        // settle the ticket.
        await Zig.Client.settleTicket(ticket.id);

        // tell the parent that the game has finish
        Zig.Client.Messages.gameFinished();
    },
};

function logEvent(event) {
    const div = document.createElement("div");
    div.innerText = JSON.stringify(event);
    document.querySelector("#events").appendChild(div);
}

window.onload = () => {
    Zig.Client.Messages.gameLoaded();
};
