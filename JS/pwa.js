if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function () {


            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )

                .then(
                    function () {

                        console.log(
                            "Toy Haven PWA registered."
                        );

                    }
                )

                .catch(
                    function (
                        error
                    ) {

                        console.log(
                            "PWA registration failed:",
                            error
                        );

                    }
                );


        }
    );

}