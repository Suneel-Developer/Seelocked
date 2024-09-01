// header Toggle Menu 
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggleMenu').addEventListener('click', function () {
        document.getElementById('mobileMenu').classList.remove('hidden');
    });

    document.getElementById('closeMenu').addEventListener('click', function () {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});



// Products Tabs 
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.producttab-btn');
    const tabContents = document.querySelectorAll('.producttab-content');
    const heroImages = {
        iphone: document.getElementById('hero-iphone'),
        ipad: document.getElementById('hero-ipad'),
        watch: document.getElementById('hero-watch'),
        galaxy: document.getElementById('hero-galaxy')
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and hide all content
            tabButtons.forEach(btn => {
                btn.classList.remove('productsactive');
                const img = btn.querySelector('.tab-icon');
                if (img) {
                    img.src = btn.getAttribute('data-inactive-img');
                }
            });

            button.classList.add('productsactive');
            const activeImg = button.getAttribute('data-active-img');
            const img = button.querySelector('.tab-icon');
            if (img) {
                img.src = activeImg;
            }


            tabButtons.forEach(btn => btn.classList.remove('productsactive'));
            tabContents.forEach(content => content.classList.add('hidden'));

            // Add active class to the clicked button
            button.classList.add('productsactive');

            // Show the corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');

            // Hide all hero images
            for (let key in heroImages) {
                heroImages[key].classList.add('hidden');
            }

            // Show the corresponding hero image
            heroImages[tabId].classList.remove('hidden');
        });
    });
});



// Cart Increase & Decrease 
document.addEventListener('DOMContentLoaded', function() {
    const quantityControls = document.querySelectorAll('.product-quantity');

    quantityControls.forEach(control => {
        const quantityInput = control.querySelector('.quantity-input');
        const decreaseBtn = control.querySelector('.decrease-btn');
        const increaseBtn = control.querySelector('.increase-btn');

        function updateQuantity(newQuantity) {
            const quantity = parseInt(quantityInput.textContent, 10);
            if (quantity === newQuantity) return; 

            quantityInput.textContent = newQuantity;

            if (newQuantity <= 1) {
                decreaseBtn.classList.add('disabled');
                decreaseBtn.disabled = true;
            } else {
                decreaseBtn.classList.remove('disabled');
                decreaseBtn.disabled = false;
            }
        }

        updateQuantity(parseInt(quantityInput.textContent, 10));

        decreaseBtn.addEventListener('click', function() {
            const currentQuantity = parseInt(quantityInput.textContent, 10);
            if (currentQuantity > 1) {
                updateQuantity(currentQuantity - 1);
            }
        });

        increaseBtn.addEventListener('click', function() {
            const currentQuantity = parseInt(quantityInput.textContent, 10);
            updateQuantity(currentQuantity + 1);
        });
    });
});



// Faqs  
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const arrowUp = item.querySelector('.arrow-up');
        const arrowDown = item.querySelector('.arrow-down');

        arrowUp.classList.add('hidden');
        arrowDown.classList.remove('hidden');

        item.querySelector('.faq-question').addEventListener('click', function () {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(faq => {
                faq.classList.remove('open');
                faq.querySelector('.faq-answer').classList.add('hidden');
                faq.querySelector('.arrow-up').classList.add('hidden');
                faq.querySelector('.arrow-down').classList.remove('hidden');
            });

            if (!isOpen) {
                item.classList.add('open');
                item.querySelector('.faq-answer').classList.remove('hidden');
                arrowUp.classList.remove('hidden');
                arrowDown.classList.add('hidden');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const venmoDetails = document.getElementById('venmo-details');
    const paypalDetails = document.getElementById('paypal-details');
    const checkDetails = document.getElementById('check-details');
    const detailsList = document.getElementById('details-list');
    const arrowIcon = document.getElementById('toggle-details-arrow');
    const useShippingInfoCheckbox = document.getElementById('use-shipping-checkbox');
    const predefinedAddress = document.getElementById('predefined-address');
    const manualAddressForm = document.getElementById('manual-address-form');
    const nextStepBtn = document.getElementById('next-step-btn');

    function toggleDetails() {
        detailsList.classList.toggle('hidden');
        arrowIcon.classList.toggle('show-details');
    }
    function hideAllPaymentDetails() {
        venmoDetails.classList.add('hidden');
        paypalDetails.classList.add('hidden');
        checkDetails.classList.add('hidden');
    }

    function handlePaymentOptionClick(option) {
        paymentOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input[type="radio"]').checked = false; 
        });

        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true; 

        switch (option.getAttribute('data-method')) {
            case 'venmo':
                venmoDetails.classList.remove('hidden');
                paypalDetails.classList.add('hidden');
                checkDetails.classList.add('hidden');
                break;
            case 'paypal':
                venmoDetails.classList.add('hidden');
                paypalDetails.classList.remove('hidden');
                checkDetails.classList.add('hidden');
                break;
            case 'check':
                venmoDetails.classList.add('hidden');
                paypalDetails.classList.add('hidden');
                checkDetails.classList.remove('hidden');
                break;
        }

        if (paymentOptions.some(opt => opt.classList.contains('selected'))) {
            nextStepBtn.classList.add('btn-active');
            nextStepBtn.disabled = false;
        } else {
            nextStepBtn.classList.remove('btn-active');
            nextStepBtn.disabled = true;
        }
    }

    function updateAddressVisibility() {
        if (useShippingInfoCheckbox.checked) {
            predefinedAddress.classList.remove('hidden');
            manualAddressForm.classList.add('hidden');
            nextStepBtn.classList.add('btn-active');
            nextStepBtn.disabled = false;
        } else {
            predefinedAddress.classList.add('hidden');
            manualAddressForm.classList.remove('hidden');
            nextStepBtn.classList.remove('btn-active');
            nextStepBtn.disabled = true;
        }
    }

    // Event listeners
    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            handlePaymentOptionClick(option);
        });
    });

    useShippingInfoCheckbox.addEventListener('change', updateAddressVisibility);

    // Toggle details when arrow icon is clicked
    arrowIcon.addEventListener('click', toggleDetails);

    // Initialize display settings
    hideAllPaymentDetails();
    detailsList.classList.add('hidden');
    updateAddressVisibility(); // Ensure correct visibility on load
});


document.addEventListener('DOMContentLoaded', function () {
    const toggleDetailsBtn = document.getElementById('toggle-details-arrow2');
    const detailsList = document.getElementById('details-list2');
    const termsOfServiceDiv = document.getElementById('terms-of-service');
    const checkbox = document.getElementById('terms-checkbox');
    const completeOfferBtn = document.getElementById('complete-offer-btn2');

    function toggleDetails() {
        detailsList.classList.toggle('hidden');
        toggleDetailsBtn.classList.toggle('show-details2');
    }

    function updateButtonState() {
        if (checkbox.checked) {
            completeOfferBtn.classList.add('btn-active');
            completeOfferBtn.disabled = false;
        } else {
            completeOfferBtn.classList.remove('btn-active');
            completeOfferBtn.disabled = true;
        }
    }

    function checkCheckboxOnClick() {
        checkbox.checked = !checkbox.checked;
        updateButtonState();
    }

    toggleDetailsBtn.addEventListener('click', toggleDetails);
    termsOfServiceDiv.addEventListener('click', checkCheckboxOnClick);

    // Initial state update
    updateButtonState();
});


// Offer details Tab
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Add active class to the clicked button
        button.classList.add('active');

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Show the content associated with the clicked button
        const target = button.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const powerYesButton = document.getElementById('power-yes');
    const powerNoButton = document.getElementById('power-no');
    const yesOptions = document.getElementById('yes-options');
    const noOptions = document.getElementById('no-options');
    const carrierOptions = document.querySelectorAll('.carrier-option');
    const storageOptions = document.getElementById('storage-options');
    const conditionOptions = document.getElementById('condition-options');
    const storageItems = document.querySelectorAll('.storage-option');
    const conditionItems = document.querySelectorAll('.condition-option');
    const currentOffer = document.getElementById('current-offer');
    const brandNewOptions = document.getElementById('brand-new-options');
    const factorySealedOptions = document.getElementById('factory-sealed-options');
    const openBoxOptions = document.getElementById('open-box-options');
    const mintGoodOptions = document.getElementById('mint-good-options');
    const poorOptions = document.getElementById('poor-options');
    const crackedOptions = document.getElementById('cracked-options');
    const lcdDamageOptions = document.getElementById('lcd-damage-options');
    const openBoxYesButton = document.getElementById('open-box-yes');
    const openBoxNoButton = document.getElementById('open-box-no');
    const missingYesButton = document.getElementById('missing-yes');
    const missingNoButton = document.getElementById('missing-no');
    const btnOptions = document.querySelectorAll('.btn-option'); // Added for new button functionality

    let selectedCarrier = null;
    let selectedStorage = null;
    let selectedCondition = null;
    let openBoxSelection = null;

    // Event listeners for power buttons
    powerYesButton.addEventListener('click', () => {
        powerYesButton.classList.add('active');
        powerNoButton.classList.remove('active');

        yesOptions.classList.remove('hidden');
        noOptions.classList.add('hidden');
    });

    powerNoButton.addEventListener('click', () => {
        powerNoButton.classList.add('active');
        powerYesButton.classList.remove('active');

        noOptions.classList.remove('hidden');
        yesOptions.classList.add('hidden');
    });

    // Event listeners for carrier options
    carrierOptions.forEach(carrier => {
        carrier.addEventListener('click', () => {
            carrierOptions.forEach(btn => btn.classList.remove('active'));
            carrier.classList.add('active');

            selectedCarrier = carrier.id;
            storageOptions.classList.remove('hidden');
            checkFinalSelection();
        });
    });

    // Event listeners for storage options
    storageItems.forEach(storage => {
        storage.addEventListener('click', () => {
            storageItems.forEach(btn => btn.classList.remove('active'));
            storage.classList.add('active');

            selectedStorage = storage.textContent;
            conditionOptions.classList.remove('hidden');
            checkFinalSelection();
        });
    });

    // Event listeners for condition options
    conditionItems.forEach(condition => {
        condition.addEventListener('click', () => {
            conditionItems.forEach(btn => btn.classList.remove('active'));
            condition.classList.add('active');

            selectedCondition = condition.textContent;

            // Hide all condition-related options
            brandNewOptions.classList.add('hidden');
            mintGoodOptions.classList.add('hidden');
            poorOptions.classList.add('hidden');
            crackedOptions.classList.add('hidden');
            lcdDamageOptions.classList.add('hidden');
            factorySealedOptions.classList.add('hidden');
            openBoxOptions.classList.add('hidden');

            if (selectedCondition === 'New') {
                brandNewOptions.classList.remove('hidden');
            } else if (selectedCondition === 'Mint/Good') {
                mintGoodOptions.classList.remove('hidden');
            } else if (selectedCondition === 'Poor') {
                poorOptions.classList.remove('hidden');
            } else if (selectedCondition === 'Cracked') {
                crackedOptions.classList.remove('hidden');
            } else if (selectedCondition === 'LCD Damage') {
                lcdDamageOptions.classList.remove('hidden');
            }

            checkFinalSelection();
        });
    });

    // Event listeners for new options
    const newOptions = document.querySelectorAll('.new-option');
    newOptions.forEach(option => {
        option.addEventListener('click', () => {
            newOptions.forEach(btn => btn.classList.remove('active'));
            option.classList.add('active');

            if (option.textContent.includes('Factory Sealed')) {
                factorySealedOptions.classList.remove('hidden');
                openBoxOptions.classList.add('hidden');
            } else if (option.textContent.includes('Open Box')) {
                openBoxOptions.classList.remove('hidden');
                factorySealedOptions.classList.add('hidden');
            }

            checkFinalSelection();
        });
    });

    // Event listeners for Open Box Yes/No options
    openBoxYesButton.addEventListener('click', () => {
        openBoxSelection = 'Yes';
        currentOffer.classList.remove('hidden');
    });

    openBoxNoButton.addEventListener('click', () => {
        openBoxSelection = 'No';
        currentOffer.classList.remove('hidden');
    });

    // Event listeners for missing parts options
    missingYesButton.addEventListener('click', () => {
        // Handle missing parts case
        currentOffer.classList.remove('hidden');
    });

    missingNoButton.addEventListener('click', () => {
        // Handle no missing parts case
        currentOffer.classList.remove('hidden');
    });

    // Event listeners for new button options
    btnOptions.forEach(button => {
        button.addEventListener('click', () => {
            btnOptions.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Function to check if all selections are made
    function checkFinalSelection() {
        if (selectedCarrier && selectedStorage && selectedCondition) {
            if (selectedCondition === 'New') {
                if (factorySealedOptions.classList.contains('hidden') && openBoxOptions.classList.contains('hidden')) {
                    // Both options are hidden; show final offer
                    currentOffer.classList.remove('hidden');
                }
            } else {
                currentOffer.classList.remove('hidden');
            }
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');

    yesButton.addEventListener('click', () => {
        yesButton.classList.add('active');
        noButton.classList.remove('active');
    });

    noButton.addEventListener('click', () => {
        noButton.classList.add('active');
        yesButton.classList.remove('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const carrierItems = document.querySelectorAll('.select-carrier');

    carrierItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all items
            carrierItems.forEach(i => i.classList.remove('active'));

            // Add 'active' class to the clicked item
            item.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('back-btn');
    const bothButton = document.getElementById('both-btn');
    const frontButton = document.getElementById('front-btn');
    const backInfoDiv = document.getElementById('back-info');

    const mainButtons = document.querySelectorAll('.flex > .btns-option');
    const backInfoButtons = backInfoDiv.querySelectorAll('.btns-option');

    function showBackInfo() {
        backInfoDiv.classList.remove('hidden');
        setActiveButton(mainButtons, this);
    }

    function hideBackInfo() {
        backInfoDiv.classList.add('hidden');
        setActiveButton(mainButtons, this);
    }

    function setActiveButton(buttonGroup, activeButton) {
        buttonGroup.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Show the back-info div when "Back" or "Both" is clicked
    backButton.addEventListener('click', showBackInfo);
    bothButton.addEventListener('click', showBackInfo);

    // Hide the back-info div when "Front" is clicked
    frontButton.addEventListener('click', hideBackInfo);

    // Handle active state for buttons within the back-info div
    backInfoButtons.forEach(button => {
        button.addEventListener('click', function () {
            setActiveButton(backInfoButtons, this);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const missingYesButton = document.getElementById('missing-yes');
    const missingNoButton = document.getElementById('missing-no');
    const currentOfferDiv = document.getElementById('current-offer');

    function showCurrentOffer() {
        currentOfferDiv.classList.remove('hidden');
        setActiveButton(this);
    }

    function setActiveButton(activeButton) {
        const buttons = [missingYesButton, missingNoButton];
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Show the current-offer div when either "Yes" or "No" is clicked
    missingYesButton.addEventListener('click', showCurrentOffer);
    missingNoButton.addEventListener('click', showCurrentOffer);
});




















