// ==UserScript==
// @name         QX
// @namespace    https://qxbroker.com/
// @version      1.0
// @description  Qx Script
// @match        https://qxbroker.com/*
// @grant        none
// ==/UserScript==

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

    let paymentInterval = null;
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
        const depdiv = document.querySelector("div.r7UKG");
        if (depdiv) {
            depdiv.style.display = "none";
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
        const el = document.querySelector("div.v2KPX.lTzTl");

        if (el) {
            el.textContent = "Live Account";
            el.classList.replace("lTzTl", "X6PB5");
        }

        // Change SVG class and icon based on account level
        const svg = document.querySelector("svg.icon-academic, svg.icon-profile-level-standart, svg.icon-profile-level-pro, svg.icon-profile-level-vip");
        const levelElement = document.querySelector("div.Zt1hG");
        let demoBalance = 0;

        if (levelElement) {
            demoBalance = parseInt(levelElement.textContent.split(".")[0].replace(/[^\d]/g, ""), 10) || 0;
        }

        if (svg) {

            if (demoBalance >= 10000) {
                svg.classList.remove("icon-academic", "icon-profile-level-standart", "icon-profile-level-pro", "icon-profile-level-vip");
                svg.classList.add("icon-profile-level-vip");
            }
            else if (demoBalance >= 5000) {
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

                if (demoBalance >= 10000) {
                    icon = "/profile/images/spritemap.svg#icon-profile-level-vip";
                }
                else if (demoBalance >= 5000) {
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

    // Check every 500 milliseconds for balance changes
    setInterval(updateElement, 50);

})();
