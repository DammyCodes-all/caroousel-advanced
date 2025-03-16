const imgUrl = [
    "images/5d91a2bf632d6208768d10ec7ca26dfe.jpg",
    "images/beachlandscape.jpg", 
    "images/Gonome\ valley.jpg", 
    "images/Japan\ scape.jpg",
     "images/tree\ scape.jpg", 
    ]

const textarea = $(".textarea")
var order = 1
let number = 1
let isStarted = false

if(!isStarted){
    textarea.eq(0).find(".title h1").css("opacity", 1)
    textarea.eq(0).find("p").css("opacity", 1);
    textarea.eq(0).find(".cta-panel").css("opacity", 1);
}
isStarted = true
$(".card").click(function(){
        number = parseInt($(this).attr("id")) 
       carouselControls(number)
    }
)

$("#next").click(function(){
        number++
        if (number >( imgUrl.length - 1)){
            number = 0
        }
        carouselControls(number)
    })
    $("#prev").click(function(){
        number--
        if (number < 0) {
            number = imgUrl.length - 1
        }
        carouselControls(number)
    })
function carouselControls(num){
    // Set the backgground image to clicked card
    $(".home-container").css({
        "background-image": `url('${imgUrl[num]}')`,
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "background-size": "cover"
    })
    
    textarea.addClass("hidden") 
    // Remove animation classes from all elements
    $(".title h1, .textarea p, .cta-panel").removeClass("animate-title animate-text animate-cta");
    textarea.eq(num).removeClass("hidden")
    
    setTimeout(() => {
        if(isStarted === true){
            textarea.eq(num).removeClass("hidden").fadeIn(() => {
            // Add animation classes after fade in
            textarea.eq(num).find(".title h1").addClass("animate-title");
            textarea.eq(num).find("p").addClass("animate-text");
            textarea.eq(num).find(".cta-panel").addClass("animate-cta");
        });
    }},100)
        
        

    $("#" + num).css("order" , order)
    order++
    if( order > imgUrl.length){
        order = 1
        $(".card").css("order", 0)
    }

    const progress = ((num + 1) / imgUrl.length) * 100
   // Update progress indicators
   $(".loader-progress").css("width", progress + "%");
   $(".load-no").text(num + 1);
}

let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (number > (imgUrl.length - 1)) {
            number = 0;
        }
        carouselControls(number);
        number++;
    }, 4500);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto-slide when page loads
startAutoSlide();

// Reset timer when user interacts with controls
$(".card, #next, #prev").click(function() {
    resetAutoSlide();
});

// // Optional: Pause on hover
// $(".home-container").hover(
//     function() { clearInterval(autoSlideInterval); },
//     function() { startAutoSlide(); }
// );