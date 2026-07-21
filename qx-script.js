(function () {
    'use strict';

	// FIREBASE Code
    const firebaseConfig = {
        apiKey: "AIzaSyB6YoTIJH7v-I2Wub4bc2_nS5LLuPagarY",
        authDomain: "tjone-23938.firebaseapp.com",
        databaseURL: "https://tjone-23938-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "tjone-23938",
        storageBucket: "tjone-23938.firebasestorage.app",
        messagingSenderId: "759655137456",
        appId: "1:759655137456:web:757c171f298fee00a6bb75"
    };

    // Initialize only once
    const firebase = window.firebase;
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    
    // automatically open the real demo page.
    if (window.location.pathname === "/en/trade") {
        window.location.replace("/en/demo-trade");
        return; // Stop the rest of the script until redirected
    }

    function updateMeta(propertyName, contentValue) {

        let meta = document.querySelector(`meta[property="${propertyName}"]`);

        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("property", propertyName);
            meta.setAttribute("data-react-helmet", "true");
            document.head.appendChild(meta);
        }

        meta.setAttribute("content", contentValue);
    }

	let UID = null;
    let IsInitialized = false;
    let PaymentInterval = null;
    let DemoBalancePrev = 0;
    let TradeTotal = 0;
    let TradeWin = 0;
    let TradeLoss = 0;
    let OpenTrades = [];
    let PNLTotal = 0; // Total Profit & Loss
    let LastPopupText = "";

    // Daily Stats
    const STORAGE_KEY = "QX_DAILY_STATS";
    function getToday() {
        const d = new Date();
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }

    async function SaveDailyStats() {
        try {
            PNLTotal = +parseFloat(PNLTotal || 0).toFixed(2);
            await db.ref("QX_DAILY_STATS/" + UID + "/" + getToday()).set({Total: TradeTotal, Win: TradeWin, Loss: TradeLoss, PNL: PNLTotal});
            console.log("Daily stats successfully saved.");
        }
        catch (err) {
            console.log("Failed to saved daily stats.");
        }
    }

    async function LoadDailyStats() {
        const snap = await db.ref("QX_DAILY_STATS/" + UID + "/" + getToday()).get();
        if (!snap.exists()) {
            TradeTotal = 0;
            TradeWin = 0;
            TradeLoss = 0;
            PNLTotal = 0;
            await SaveDailyStats();
            return;
        }

        const data = snap.val();
        TradeTotal = data.Total || 0;
        TradeWin = data.Win || 0;
        TradeLoss = data.Loss || 0;
        PNLTotal = data.PNL || 0;
        UpdatePNLDisplay();
    }
	

	// Leaderboard display
	function UpdatePNLDisplay() {
	console.log("UpdatePNLDisplay()", { PNLTotal, TradeTotal, TradeWin, TradeLoss});
    const pnlElement = document.querySelector("div.ord28.o8xRM");
	const pnlPosition = document.querySelector("div.c_7BP");
    const pnlPositionBar = document.querySelector("span.uQuVa");

    if (!pnlElement) {
        return;
    }

    pnlElement.textContent = "$" + Math.abs(PNLTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        pnlPosition.childNodes.forEach(node => {
            if (node.nodeType === 3 && node.textContent.trim() === "-") {
                node.textContent = "100+";
            }
        });

        if (PNLTotal > 0) {
            pnlElement.style.color = "#00c853";
            pnlPositionBar.style.width = "95%";
        }
        else if (PNLTotal < 0) {
            pnlElement.style.color = "#ff3d00";
            pnlPositionBar.style.width = "10%";
        }
        else {
            pnlElement.style.color = "#00c853";
        }
    }

    function updateElement() {

        // Change URL shown in address bar
        if (window.location.pathname === "/en/demo-trade") {
            history.replaceState({}, "", "/en/trade");
        }


        // Set different title for each page
        let pageTitle = "Live trading | Quotex"; // Default title

        switch (window.location.pathname) {

            case "/en/withdrawal":
                pageTitle = "Quotex: An innovative platform for online investment";
                break;

            case "/en/balance":
                pageTitle = "Payments | Quotex";
                break;

            case "/en/trades":
                pageTitle = "Trade history | Quotex";
                break;

            case "/en/pending-trades":
                pageTitle = "Pending trades | Quotex";
                break;

            case "/en/settings":
                pageTitle = "Account | Quotex";
                break;

            case "/en/market":
                pageTitle = "Market | Quotex";
                break;

            case "/en/tournaments":
                pageTitle = "Tournaments | Quotex";
                break;

            case "/en/tournaments/active":
                pageTitle = "Tournaments | Quotex";
                break;

            case "/en/tournaments/completed":
                pageTitle = "Tournaments | Quotex";
                break;

            case "/en/analytics":
                pageTitle = "Analytics | Quotex";
                break;

            default:
                pageTitle = "Live trading | Quotex";
                break;
        }

        // Change browser title
        document.title = pageTitle;

        // Change Open Graph title
        updateMeta("og:title", pageTitle);

        // Change Twitter title
        updateMeta("twitter:title", pageTitle);

        // Hide deposit bonus div
        const depdivpc = document.querySelector("div.r7UKG");
        const depdivmobile = document.querySelector("div.q04vx.o2msZ");
        if (depdivpc) {
            depdivpc.style.display = "none";
        }
        if (depdivmobile) {
            depdivmobile.style.display = "none";
        }


        // Fake payment history
        if (window.location.pathname === "/en/balance") {

            if (!PaymentInterval) {
            PaymentInterval = setInterval(() => {

                if (window.location.pathname !== "/en/balance") {
                    clearInterval(PaymentInterval);
                    PaymentInterval = null;
                    return;
                }

                const pageInfo = document.querySelector(".f8uhl");
                if (pageInfo) {
                    pageInfo.textContent = "1/5";
                }

                const pgNextBtn = document.querySelector('button.THTtN.wH2oT.ovrkj');
                if (pgNextBtn) {
                    pgNextBtn.disabled = false;
                }

            }, 50);
        }



       const list = document.querySelector(".transactions-list");

       if (list) {

           // Already added to THIS list?
           if (list.querySelector(".fake-payment")) return;


           const originalRows = list.querySelectorAll(".vDMA1");

           // Hide all original rows
           originalRows.forEach(function (row) {
               row.style.display = "none";
           });

           const firstRow = originalRows[0];

           if (firstRow) {

               const fakePayments = [	   
				   {
                       id: "51273648108",
                       date: "18/07/2026, 10:14:12",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$287.20",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273600384",
                       date: "12/07/2026, 09:16:56",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$367.25",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273638515",
                       date: "10/07/2026, 09:48:12",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$423.66",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273626055",
                       date: "09/07/2026, 07:18:41",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$266.78",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273552660",
                       date: "06/07/2026, 08:22:54",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$287.15",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273563771",
                       date: "04/07/2026, 10:12:18",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$422.65",
                       color: "#ff5b5b"
                   },
                   {
                       id: "51273551313",
                       date: "03/07/2026, 09:45:15",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$325.45",
                       color: "#ff5b5b"
                   },
                   {
                       id: "51273538856",
                       date: "02/07/2026, 08:23:18",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$354.78",
                       color: "#ff5b5b"
                   },
                   {
                       id: "51273513942",
                       date: "30/06/2026, 11:45:23",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$254.85",
                       color: "#ff5b5b"
                   },
                   {
                       id: "51273489028",
                       date: "28/06/2026, 13:54:12",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$320.00",
                       color: "#ff5b5b"
                   },
				   {
                       id: "51273145784",
                       date: "27/06/2026, 11:45:09",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$226.22",
                       color: "#ff5b5b"
                   },
                   {
                       id: "105859888",
                       date: "26/06/2026, 08:15:18",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (BEP-20)",
                       amount: "+$1000.00",
                       color: "#18c964"
                   }

               ];

               fakePayments.slice(0, 20).reverse().forEach(function (p) {

                   const row = firstRow.cloneNode(true);
                   row.style.display = ""; // Make sure clone is visible
                   row.classList.add("fake-payment");
                   row.querySelector(".VZvOf").textContent = p.id;
                   row.querySelector(".Sf_Tx").textContent = p.date;
                   row.querySelector(".Ed7UM").textContent = p.type;
                   row.querySelector(".R1N82").textContent = p.system;
                   row.querySelector(".VgSqu").textContent = p.status;

                   const amount = row.querySelector(".lekbj");
                   amount.textContent = p.amount;
                   amount.style.color = p.color;

                   // Insert after header
                   list.insertBefore(row, list.children[1]);

               });
            }
          }
        }



        // Change "Demo Account" -> "Live Account"
        const isMobile = window.innerWidth <= 768;
        const el = document.querySelector("div.v2KPX.lTzTl");

        if (el) {
            el.textContent = isMobile ? "Live" : "Live Account";
            el.classList.replace("lTzTl", "X6PB5");
        }

        // Change SVG class and icon based on account level
        const svg = document.querySelector("svg.icon-academic, svg.icon-profile-level-standart, svg.icon-profile-level-pro, svg.icon-profile-level-vip");
        const levelElement = document.querySelector("div.Zt1hG");
        let DemoBalance = 0;
        let DemoBalanceNow = 0;

        if (levelElement) {
			UID = window.settings?.id?.toString() || "";
            DemoBalance = parseInt(levelElement.textContent.split(".")[0].replace(/[^\d]/g, ""), 10) || 0;
            DemoBalanceNow = parseFloat(levelElement.textContent.replace(/[$,]/g, "")) || 0;

			if (!UID) return;
			
	    	// First time only
            if (!IsInitialized) {
                DemoBalancePrev = DemoBalanceNow;
				LoadDailyStats(); // Load only once
                IsInitialized = true;
                return;
            }

	    const Diff = +(DemoBalanceNow - DemoBalancePrev).toFixed(2);

	    // Trade Opened
            if (Diff < 0) {

                OpenTrades.push(-Diff);
				console.log("Trade Opened - ", "Amount:", -Diff, "Trade Counts:", OpenTrades.length);
            }
            if (DemoBalanceNow !== DemoBalancePrev) {
                DemoBalancePrev = DemoBalanceNow;
            }
        }


        if (svg) {

            if (DemoBalance >= 10000) {
                svg.classList.remove("icon-academic", "icon-profile-level-standart", "icon-profile-level-pro", "icon-profile-level-vip");
                svg.classList.add("icon-profile-level-vip");
            }
            else if (DemoBalance >= 5000) {
                svg.classList.remove("icon-academic", "icon-profile-level-standart", "icon-profile-level-pro", "icon-profile-level-vip");
                svg.classList.add("icon-profile-level-pro");
            }
            else {
                svg.classList.remove("icon-academic", "icon-profile-level-standart", "icon-profile-level-pro", "icon-profile-level-vip");
                svg.classList.add("icon-profile-level-standart");
            }
            const use = svg.querySelector("use");

            if (use) {

                let icon = "/profile/images/spritemap.svg#icon-profile-level-standart";

                if (DemoBalance >= 10000) {
                    icon = "/profile/images/spritemap.svg#icon-profile-level-vip";
                }
                else if (DemoBalance >= 5000) {
                    icon = "/profile/images/spritemap.svg#icon-profile-level-pro";
                }
                else {
                    icon = "/profile/images/spritemap.svg#icon-profile-level-standart";
                }

                use.setAttribute("xlink:href", icon);
                use.setAttribute("href", icon);
            }
        }

    }

    // Initial run
    updateElement();

    // Keep changes after dynamic page updates
    const observer = new MutationObserver(updateElement);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


	// For TOP Button (PC + Mobile)
    document.addEventListener("click", function (e) {
        const topBtn = e.target.closest(".KYcVi, .IM80M");
        if (!topBtn || topBtn.textContent.trim() !== "TOP") {
            return;
        }

        const timer = setInterval(() => {
            const pnlElement = document.querySelector("div.ord28.o8xRM");
            const pnlPosition = document.querySelector("div.c_7BP");
            const pnlBar = document.querySelector("span.uQuVa");

            // Wait until ALL required elements exist
            if (!pnlElement || !pnlPosition || !pnlBar) {
                return;
            }

            clearInterval(timer);

            // Wait until Quotex finishes rendering
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    UpdatePNLDisplay();
                });
            });
        }, 20);
    });

	

    // Detect Result Popup
    const popupObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {

            if (!(node instanceof HTMLElement))
            {
                return;
            }

            // Detect the popup itself or if it is inside another node
            const popup = node.matches(".LYJYG") ? node : node.querySelector(".LYJYG");

            if (!popup)
            {
                return;
            }

            const popupText = popup.innerText.trim();

            if (!popupText)
            {
                return;
            }

            if (popup.dataset.done)
            {
                return;
            }

            popup.dataset.done = "1";

            const amountElement = popup.querySelector(".GIbOO");

            if (!amountElement)
            {
                return;
            }

            const amountText = amountElement.innerText.trim();

            // Trade WIN
            if (amountText.startsWith("+")) {

                const amount = parseFloat(amountText.replace(/[^\d.]/g, ""));
                const StakeAmount = OpenTrades.shift() || 0;
                TradeTotal++;
                TradeWin++;
                PNLTotal += amount - StakeAmount;
                SaveDailyStats();
                console.table({TradeTotal, TradeWin, TradeLoss, PNLTotal: +PNLTotal.toFixed(2)});
            }
            // Trade LOSS
            else
            {
                const StakeAmount = OpenTrades.shift() || 0;
                TradeTotal++;
                TradeLoss++;
                PNLTotal -= StakeAmount;
                SaveDailyStats();
                console.table({TradeTotal, TradeWin, TradeLoss, PNLTotal: +PNLTotal.toFixed(2)});
            }

            });
        });
    });


    popupObserver.observe(document.body, {
        childList: true,
        subtree: true
    });


    // Check every 50 milliseconds for balance changes
    setInterval(updateElement, 50);

})();
