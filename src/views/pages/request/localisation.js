google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
    var input = document.getElementById('autocomplete_search');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    // place variable will have all the information you are looking for.
    $('#lat').val(place.geometry['location'].lat());
    $('#long').val(place.geometry['location'].lng());
    console.log(place)
});
}
export default initialize