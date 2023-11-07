document.addEventListener("DOMContentLoaded", function () {
    // Get the "count" button element from popup.html
    const countButton = document.getElementById("countButton");

    // Get the "count" div element where we will display the count
    const countDiv = document.getElementById("count");

    countButton.addEventListener("click", () => {
        // Send a message to the content script to request the page content
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0]) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        function: () => {
                            const links = document.querySelectorAll('a');
                            let leetcodeCount = 0;
                            links.forEach((link) => {
                                if (link.href.includes('leetcode.com')) {
                                    leetcodeCount++;
                                }
                            });
                            return leetcodeCount;
                        }
                    },
                    (result) => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        } else {
                            const leetcodeCount = result[0].result;
                            countDiv.textContent = `${leetcodeCount}`;
                        }
                    }
                );
            }
        });
    });
});
