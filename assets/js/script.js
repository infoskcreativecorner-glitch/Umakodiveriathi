// Uma Kodiveri Athi JavaScript
// Author: Antigravity Coding Assistant
// Date: 2026-07-04

// 1. WhatsApp Product Order Integration
function orderProduct(productName) {
    var phoneNumber = "919944140286"; // International format for +91 9944140286
    var message = "";

    if (productName === "Fig Powder") {
        message = "Hi Uma Kodiveri Athi, I want to order Fig Powder. Please share availability, pricing, and payment details.";
    } else {
        message = "Hi Uma Kodiveri Athi, I want to order " + productName + ". Please share availability and payment details.";
    }

    var encodedMessage = encodeURIComponent(message);
    var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;
    
    // Open in a new tab/window
    window.open(whatsappUrl, '_blank');
}

// Google Sheets Order Logger Integration
// Paste your deployed Web App URL here after setting up the Google Apps Script
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxG4wNnCPW5KOdlpJGcBF49rIh3vVD9f01oxgqs0B6nOLatn7j-kOyXOe6lbLV_HVy2fA/exec"; 

function logOrderToGoogleSheet(productName, weight, quantity, totalAmount) {
    if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes("YOUR_DEPLOYED_WEBAPP")) {
        console.log("Order logged locally (Google Sheets Web App URL not configured):", { productName, weight, quantity, totalAmount });
        return;
    }
    
    var params = new URLSearchParams({
        sheetName: "Sheet1",
        formType: "order",
        product: productName,
        size: weight,
        quantity: quantity,
        total: totalAmount
    });
    
    fetch(GOOGLE_SHEET_WEBAPP_URL + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors"
    })
    .then(function() {
        console.log("Order logged to Google Sheets Sheet1 successfully.");
    })
    .catch(function(err) {
        console.error("Error logging order to Google Sheets:", err);
    });
}

function logMessageToGoogleSheet(name, phone, email, subject, message) {
    if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes("YOUR_DEPLOYED_WEBAPP")) {
        console.log("Message logged locally (Google Sheets Web App URL not configured):", { name, phone, email, subject, message });
        return;
    }
    
    var params = new URLSearchParams({
        sheetName: "Sheet2",
        formType: "contact",
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message
    });
    
    fetch(GOOGLE_SHEET_WEBAPP_URL + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors"
    })
    .then(function() {
        console.log("Contact message logged to Google Sheets Sheet2 successfully.");
    })
    .catch(function(err) {
        console.error("Error logging contact message to Google Sheets:", err);
    });
}

$(document).ready(function() {
    console.log("Uma Kodiveri Athi brand website is active.");

    // Redirect product cards (click anywhere except selectors/buttons) to detailed product page
    $(document).on('click', '.product-card', function(e) {
        // Exclude clicks on interactive elements
        if ($(e.target).closest('.wishlist-btn, .dropdown, .quantity-pill-counter, .btn-order-whatsapp').length > 0) {
            return; // Let bootstrap dropdowns, quantity counters, and whatsapp order handles run natively
        }
        
        const card = $(this).closest('.product-item-col');
        const productId = card.data('product-id');
        if (productId) {
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });



    // 3. Smooth Scroll for Navbar Links & Closing Mobile Menu
    $('.navbar-nav a[href^="#"], .hero-section a[href^="#"], .about-section a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            
            // On mobile, close the collapsible navbar menu first
            var navToggler = $('.navbar-toggler');
            var navCollapse = $('#navbarContent');
            if (navCollapse.hasClass('show')) {
                navToggler.trigger('click');
            }

            // Scroll to the element smoothly
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Offset navbar height
            }, 800);
        }
    });

    // 4. Custom ScrollSpy (Highlight navbar links on scroll)
    var navLinks = $('.navbar-nav .nav-link');
    var sections = $('section');
    
    $(window).scroll(function() {
        var scrollPos = $(this).scrollTop() + 150; // Offset for detection triggers
        
        sections.each(function() {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                var correspondingLink = $('#link-' + id);
                if (correspondingLink.length) {
                    navLinks.removeClass('active');
                    correspondingLink.addClass('active');
                }
            }
        });
    });

    // 5. Gallery Lightbox Modal Setup
    $('.gallery-card').on('click', function() {
        var imgSrc = $(this).find('img').attr('src');
        var imgTitle = $(this).find('.gallery-title').text();
        var imgDesc = $(this).find('.gallery-subtitle').text();
        
        $('#modalImg').attr('src', imgSrc);
        $('#modalCaption').html('<strong>' + imgTitle + '</strong> - ' + imgDesc);
        
        // Show Bootstrap Modal
        var galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
        galleryModal.show();
    });

    // 6. Scroll Reveal Animations
    // Dynamically apply animation classes to keep HTML source clean
    $('#heroTextContainer').addClass('reveal-fade');
    $('#aboutTextContent, #aboutCardsGrid').addClass('reveal-slide-up');
    $('.product-card').addClass('reveal-slide-up');
    $('.benefit-card').addClass('reveal-slide-up');
    $('#priceTableWrapper, #priceTableNote').addClass('reveal-fade');
    $('.order-step-card, #paymentDetailsWrapper').addClass('reveal-slide-up');
    $('.gallery-item-col').addClass('reveal-slide-up');
    $('#locationInfo, #locationMap').addClass('reveal-slide-up');
    $('#contactCardsGrid, #contactCtaRow').addClass('reveal-slide-up');

    // Run verification on load and on scroll
    function checkReveal() {
        var windowHeight = $(window).height();
        var revealOffset = 100; // Trigger when element is 100px visible
        
        $('.reveal-fade, .reveal-slide-up').each(function() {
            var elementTop = $(this).offset().top;
            var scrollTop = $(window).scrollTop();
            
            if (scrollTop + windowHeight > elementTop + revealOffset) {
                $(this).addClass('reveal-active');
            }
        });
    }

    // Trigger reveal checks
    $(window).on('scroll', checkReveal);
    // Timeout call to trigger initial load reveal
    setTimeout(checkReveal, 300);

    // E-Commerce Interactions for Product Cards
    
    // 7. Wishlist Heart Toggle
    $('.wishlist-btn').on('click', function() {
        $(this).toggleClass('active');
        var heartIcon = $(this).find('.wishlist-icon');
        if ($(this).hasClass('active')) {
            heartIcon.removeClass('fa-regular').addClass('fa-solid');
        } else {
            heartIcon.removeClass('fa-solid').addClass('fa-regular');
        }
    });

    // 8. Weight Selector Dropdown Change
    // Custom Dropdown Item Click
    $('.dropdown-menu').on('click', '.dropdown-item', function(e) {
        e.preventDefault();
        var card = $(this).closest('.product-item-col');
        
        // Remove active class from siblings and add to this
        card.find('.dropdown-item').removeClass('active-item');
        $(this).addClass('active-item');
        
        // Update display text inside trigger
        var text = $(this).text();
        card.find('.selected-weight-display').html(text);
        
        // Update hidden input attributes
        var val = $(this).attr('data-value');
        var price = $(this).attr('data-price');
        var tag = $(this).attr('data-tag');
        
        var hiddenInput = card.find('.product-weight-select-value');
        hiddenInput.val(val).attr('data-price', price).attr('data-tag', tag);
        
        // Update tag badge on top left of image
        card.find('.product-tag').text(tag);
        
        // Recalculate price
        updateProductPrice(card);
    });

    // 9. Quantity Minus Click
    $('.btn-quantity-minus').on('click', function() {
        var card = $(this).closest('.product-item-col');
        var qtySpan = card.find('.quantity-value');
        var currentQty = parseInt(qtySpan.text());
        if (currentQty > 1) {
            qtySpan.text(currentQty - 1);
            updateProductPrice(card);
        }
    });

    // 10. Quantity Plus Click
    $('.btn-quantity-plus').on('click', function() {
        var card = $(this).closest('.product-item-col');
        var qtySpan = card.find('.quantity-value');
        var currentQty = parseInt(qtySpan.text());
        qtySpan.text(currentQty + 1);
        updateProductPrice(card);
    });

    // 11. Helper to calculate total price
    function updateProductPrice(card) {
        var hiddenInput = card.find('.product-weight-select-value');
        var unitPrice = parseInt(hiddenInput.attr('data-price'));
        var quantity = parseInt(card.find('.quantity-value').text());
        var totalPrice = unitPrice * quantity;
        
        card.find('.total-price-amount').html('&#8377;' + totalPrice);
    }

    // 12. Dynamic WhatsApp Checkout Order Now Link
    $('.btn-order-whatsapp').on('click', function() {
        var card = $(this).closest('.product-item-col');
        var productName = card.data('product-name');
        var hiddenInput = card.find('.product-weight-select-value');
        var selectedWeight = hiddenInput.val();
        var unitPrice = parseInt(hiddenInput.attr('data-price'));
        var quantity = parseInt(card.find('.quantity-value').text());
        var totalPrice = unitPrice * quantity;
        
        var phoneNumber = "919944140286"; // International format for +91 9944140286
        var message = "Hi Uma Kodiveri Athi, I want to order:\n" +
                      "• Product: " + productName + "\n" +
                      "• Size Selected: " + selectedWeight + "\n" +
                      "• Quantity: " + quantity + "\n" +
                      "• Total Price: ₹" + totalPrice + "\n\n" +
                      "Please share availability and payment details.";
                      
        var encodedMessage = encodeURIComponent(message);
        logOrderToGoogleSheet(productName, selectedWeight, quantity, totalPrice);
        var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;
        window.open(whatsappUrl, '_blank');
    });
    // 13. Interactive Price Table Dropdowns & Adjusters
    $('.table-weight-dropdown').on('click', '.dropdown-item', function(e) {
        e.preventDefault();
        var container = $(this).closest('.table-weight-select-container');
        var row = $(this).closest('tr');
        
        // Remove active class from sibling links and add to this
        container.find('.dropdown-item').removeClass('active-item');
        $(this).addClass('active-item');
        
        // Update hidden input attributes
        var val = $(this).attr('data-value');
        var price = $(this).attr('data-price');
        var courier = $(this).attr('data-courier');
        
        var hiddenInput = container.find('.table-weight-select-value');
        hiddenInput.val(val).attr('data-price', price).attr('data-courier', courier);
        
        // Recalculate price in this table row
        updateTableRowPrice(row);
    });

    // Table Weight Minus Click (decreases ORDER QUANTITY)
    $('.table-weight-select-container').on('click', '.btn-table-weight-minus', function(e) {
        e.preventDefault();
        var container = $(this).closest('.table-weight-select-container');
        var row = $(this).closest('tr');
        var hiddenInput = container.find('.table-weight-select-value');
        
        var qty = parseInt(hiddenInput.attr('data-qty')) || 1;
        if (qty > 1) {
            qty--;
            hiddenInput.attr('data-qty', qty);
            updateTableRowPrice(row);
        }
    });

    // Table Weight Plus Click (increases ORDER QUANTITY)
    $('.table-weight-select-container').on('click', '.btn-table-weight-plus', function(e) {
        e.preventDefault();
        var container = $(this).closest('.table-weight-select-container');
        var row = $(this).closest('tr');
        var hiddenInput = container.find('.table-weight-select-value');
        
        var qty = parseInt(hiddenInput.attr('data-qty')) || 1;
        qty++;
        hiddenInput.attr('data-qty', qty);
        updateTableRowPrice(row);
    });

    // Helper to calculate table row price
    function updateTableRowPrice(row) {
        var hiddenInput = row.find('.table-weight-select-value');
        var weightVal = hiddenInput.val();
        var unitPrice = parseInt(hiddenInput.attr('data-price'));
        var unitCourier = parseInt(hiddenInput.attr('data-courier'));
        var qty = parseInt(hiddenInput.attr('data-qty')) || 1;
        
        // Calculations
        var totalPrice = unitPrice * qty;
        var totalCourier = unitCourier * qty;
        var totalAmount = totalPrice + totalCourier;
        
        // Update display text inside trigger
        var displayText = weightVal;
        if (qty > 1) {
            displayText = weightVal + ' x ' + qty;
        }
        row.find('.selected-table-weight-display').html(displayText);
        
        // Update row cells
        row.find('.table-row-price').html('&#8377;' + totalPrice);
        row.find('.table-row-courier').html('&#8377;' + totalCourier);
        row.find('.table-row-total').html('&#8377;' + totalAmount);
    }

    // Dynamic WhatsApp checkout for table order buttons
    $('.btn-table-order').on('click', function() {
        var row = $(this).closest('tr');
        var productName = row.find('.product-table-name').text();
        var hiddenInput = row.find('.table-weight-select-value');
        
        var selectedWeight = hiddenInput.val();
        var unitPrice = parseInt(hiddenInput.attr('data-price'));
        var unitCourier = parseInt(hiddenInput.attr('data-courier'));
        var qty = parseInt(hiddenInput.attr('data-qty')) || 1;
        
        var totalPrice = unitPrice * qty;
        var totalCourier = unitCourier * qty;
        var totalAmount = totalPrice + totalCourier;
        
        var phoneNumber = "919944140286"; // International format for +91 9944140286
        var message = "Hi Uma Kodiveri Athi, I want to order:\n" +
                      "• Product: " + productName + "\n" +
                      "• Size Selected: " + selectedWeight + "\n" +
                      "• Quantity: " + qty + "\n" +
                      "• Total Price (with Courier): ₹" + totalAmount + "\n\n" +
                      "Please share availability and payment details.";
                      
        var encodedMessage = encodeURIComponent(message);
        logOrderToGoogleSheet(productName, selectedWeight, qty, totalAmount);
        var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;
        window.open(whatsappUrl, '_blank');
    });

    // 14. Helper to display beautiful custom Toast alerts
    function showToast(title, message) {
        var toastContainer = $('#toastContainer');
        if (!toastContainer.length) {
            $('body').append('<div id="toastContainer" class="position-fixed bottom-0 end-0 p-3" style="z-index: 9999;"></div>');
            toastContainer = $('#toastContainer');
        }
        
        var toastId = 'toast-' + Date.now();
        var toastHtml = `
            <div id="${toastId}" class="toast align-items-center text-white border-0 mb-2 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
                <div class="d-flex">
                    <div class="toast-body p-3">
                        <strong class="d-block mb-1 text-uppercase"><i class="fa-solid fa-circle-check me-2"></i>${title}</strong>
                        <span class="small">${message}</span>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        toastContainer.append(toastHtml);
        var toastElement = document.getElementById(toastId);
        var toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove element from DOM after it fades out
        toastElement.addEventListener('hidden.bs.toast', function () {
            $(this).remove();
        });
    }

    // Contact Form submission handler (Logs details to Sheet2)
    $(document).on('submit', '#contactForm', function(e) {
        e.preventDefault();
        
        var name = $('#formName').val();
        var phone = $('#formPhone').val();
        var email = $('#formEmail').val() || "N/A";
        var subject = $('#formSubject').val();
        var message = $('#formMessage').val();
        
        // Log to Google Sheet (Sheet2)
        logMessageToGoogleSheet(name, phone, email, subject, message);
        
        // Show premium success toast
        showToast("Message Sent", "Thank you! Your message has been sent successfully. We will get back to you shortly.");
        
        // Reset the form
        this.reset();
    });

    // Scroll to Top Button Injection
    $('body').append(`
        <a href="#" class="back-to-top shadow-sm d-flex align-items-center justify-content-center" id="backToTopBtn" title="Back to Top" aria-label="Scroll back to top">
            <i class="fa-solid fa-chevron-up"></i>
        </a>
    `);

    var backToTop = $('#backToTopBtn');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});
