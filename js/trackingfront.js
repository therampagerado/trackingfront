/**
 * Copyright (C) 2017-2024 thirty bees
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@thirtybees.com so we can send you a copy immediately.
 *
 * @author    thirty bees <modules@thirtybees.com>
 * @copyright 2017-2024 thirty bees
 * @license   Academic Free License (AFL 3.0)
 */

$(function () {

    updateValues();

    $("#datepickerFrom").datepicker({
        prevText: "",
        nextText: "",
        dateFormat: "yy-mm-dd"});

    $("#datepickerTo").datepicker({
        prevText: "",
        nextText: "",
        dateFormat: "yy-mm-dd"});

});

function updateValues() {
    $.getJSON("stats.php", {ajaxProductFilter: 1, id_referrer: referrer_id, token: token, id_product: 0},
        function (j) {
            $.each(display_tab, function (index, value) {
				if (value == 'reg_rate' || value == 'order_rate')
					 $("#" + value).html(parseFloat(j[0][value] * 100).toFixed(2) + ' %');
				else
					$("#" + value).html(j[0][value]);
            });
        }
    )
}

function showProductLines() {
    var irow = 0;
    for (var i = 0; i < product_ids.length; ++i)
        $.getJSON("stats.php", {ajaxProductFilter: 1, token: token, id_referrer: referrer_id, id_product: product_ids[i]},
            function (result) {
                if (result) {
                    var newLine = newProductLine(referrer_id, result[0], (irow++ % 2 ? 204 : 238));
                    $(newLine).hide().insertBefore($('#trid_dummy')).fadeIn();
                }
            }
        );
}

function newProductLine(id_referrer, result, color) {
    return '' +
        '<tr id="trprid_' + id_referrer + '_' + result.id_product + '" style="background-color: rgb(' + color + ', ' + color + ', ' + color + ');">' +
        ' <td align="center">' + result.id_product + '</td>' +
        ' <td>' + result.product_name + '</td>' +
        ' <td align="center">' + result.uniqs + '</td>' +
        ' <td align="center">' + result.visits + '</td>' +
        ' <td align="center">' + result.pages + '</td>' +
        ' <td align="center">' + result.registrations + '</td>' +
        ' <td align="center">' + result.orders + '</td>' +
        ' <td align="right">' + result.sales + '</td>' +
        ' <td align="right">' + result.cart + '</td>' +
        ' <td align="center">' + result.reg_rate + '</td>' +
        ' <td align="center">' + result.order_rate + '</td>' +
        ' <td align="center">' + result.click_fee + '</td>' +
        ' <td align="center">' + result.base_fee + '</td>' +
        ' <td align="center">' + result.percent_fee + '</td>' +
        '</tr>';
}
