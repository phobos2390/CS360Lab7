$(document).ready(function()
{
  $("#cityfield").keyup(function()
  {
    var url = "http://ec2-52-27-30-181.us-west-2.compute.amazonaws.com:3002/getcity?q="+$("#cityfield").val();
    $.getJSON(url,function(data)
    {
      console.log("got " + data);
      var everything;
      everything = "<ul>";
      $.each(data, function(i,item)
      {
        everything += "<li> " + data[i].city + "</li>";
      });
      everything += "</ul>";
      $("#txtHint").html(everything);
    });
    /*$.ajax(
    {
      url:"api.openweathermap.org/data/2.5/weather?q={city name}",
      crossDomain: true,
      dataType:"jsonp",
      success: function(result)
      {
        console.log(result);
        $("#div1").html("<img src='" + result.img + "'>");
      }
    });//*/
  });
  $("#button").click(function(e)
  {
    var value = $("#cityfield").val();
    console.log(value);
    e.preventDefault();
    $("#dispcity").text(value);
    var weatherAPI = "https://api.wunderground.com/api/02721753c43cc8c2/geolookup/conditions/q/UT/" + value + ".json";
    console.log("Trying to get data from " + weatherAPI);
    $.getJSON(weatherAPI, function(data)
    {
      console.log(data);
      $("#weather").text( "Temperature: " + data.current_observation.temperature_string);
    });
  });
});
