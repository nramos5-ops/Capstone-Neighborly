$(document).ready(function() {
    $("#slider").bxSlider({
        auto: true,
        random: true,
        captions: true,
        pager: true,
        pagerType: 'short',
        pause: 5000,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 500,
        slideMargin: 20
    });
});

function showChart(checkbox) {
    console.log(checkbox.dataset.chartName);
    const chartId = document.getElementById(checkbox.dataset.chartName);

    chartId.classList.toggle('hide');
    
}