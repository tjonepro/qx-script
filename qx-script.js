(function () {
    'use strict';

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
    //localStorage.removeItem("QX_DAILY_STATS");
    const STORAGE_KEY = "QX_DAILY_STATS";
    function getToday() {
        const d = new Date();
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }

    function SaveDailyStats() {
        PNLTotal = parseFloat(PNLTotal) || 0;
        PNLTotal = +PNLTotal.toFixed(2);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({date: getToday(), total: TradeTotal, win: TradeWin, loss: TradeLoss, pnl: PNLTotal}));
    }

    function LoadDailyStats() {
        const today = getToday();
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!data || data.date !== today) {
            TradeTotal = 0;
            TradeWin = 0;
            TradeLoss = 0;
            PNLTotal = 0;

            SaveDailyStats();
            return;
        }

        TradeTotal = data.total || 0;
        TradeWin = data.win || 0;
        TradeLoss = data.loss || 0;
        PNLTotal = parseFloat(data.pnl) || 0;
        console.table({TradeTotal, TradeWin, TradeLoss, PNLTotal: +PNLTotal.toFixed(2)});
    }

    LoadDailyStats();


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

            if (!paymentInterval) {
            paymentInterval = setInterval(() => {

                if (window.location.pathname !== "/en/balance") {
                    clearInterval(paymentInterval);
                    paymentInterval = null;
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
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348901",
                       date: "16/07/2026, 11:30:52",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (TRC-20)",
                       amount: "+$500.00",
                       color: "#18c964"
                   },
                   {
                       id: "5127348902",
                       date: "15/07/2026, 19:21:40",
                       status: "Successed",
                       type: "Payout",
                       system: "USDT",
                       amount: "-$320.00",
                       color: "#ff5b5b"
                   },
                   {
                       id: "5127348903",
                       date: "14/07/2026, 08:15:18",
                       status: "Successed",
                       type: "Deposit",
                       system: "USDT (BEP-20)",
                       amount: "+$1000.00",
                       color: "#18c964"
                   }

               ];

               fakePayments.slice(0, 10).reverse().forEach(function (p) {

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
            DemoBalance = parseInt(levelElement.textContent.split(".")[0].replace(/[^\d]/g, ""), 10) || 0;
            DemoBalanceNow = parseFloat(levelElement.textContent.replace(/[$,]/g, "")) || 0;

	    // First time only
            if (!IsInitialized) {
                DemoBalancePrev = DemoBalanceNow;
                IsInitialized = true;
                return;
            }

	    const Diff = +(DemoBalanceNow - DemoBalancePrev).toFixed(2);

	    // Trade Opened
            if (Diff < 0) {

                OpenTrades.push(-Diff);
                console.log("Trade Opened", "Stake:", -Diff, "Open Trades:", OpenTrades.length);
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
