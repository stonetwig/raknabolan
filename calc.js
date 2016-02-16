$(function() {
  var resultbox = $('#resultbox');
  resultbox.hide();

  $('#calc').on('click', function(event) {
    var amount = parseInt($('#amount').val().replace(/\s+/g, '').replace(',', '.')) || 200000;
    var interest = parseInt($('#interest').val().replace(/\s+/g, '').replace(',', '.')) || 2;
    var years = parseInt($('#years').val()) || null;
    var amort = parseInt($('#amort').val().replace(/\s+/g, '').replace(',', '.')) || null;

    var percentInterest = interest * 0.01;
    var monthlyInterest = (amount * percentInterest) / 12;
    var monthlyAmort = 0;

    if (years !== null && (amort === null || !amort)) {
      years = years ? years : 60;
      monthlyAmort = Math.floor((amount / years) / 12);
    } else if (amort && amort > 0) {
      monthlyAmort = amort;
    } else {
      monthlyAmort = 0;
    }

    var total = Math.floor(parseInt(monthlyInterest) + parseInt(monthlyAmort));
    var description = (years !== null && (amort === null || !amort)) ?
      "Med <strong>" + years + "</strong> års avbetalningsplan och en ränta på <strong>ca " + interest + "%</strong> så kommer du betala ca:" :
      "Med en månadsamortering på <strong>" + monthlyAmort + " KR</strong> så kommer du betala ca:";

    resultbox.html("<p>" + description + "</p><p class='resultNumber'>" + total + " KR i MÅNADEN</p><p>Varav " + monthlyInterest + "kr är ränta och " + monthlyAmort + "kr är amortering</p>");
    resultbox.show();
  });

  $('#years').focusout(function () {
    if ($(this).val()) {
      $('#amort').prop('disabled', true);
    } else {
      $('#amort').prop('disabled', false);
    }
  });
});
