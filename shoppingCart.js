function setCookie(key, value)
{
	document.cookie = key + "=" + value;
}
 
function getCookieValue(key)
{
	var c = document.cookie;
	temp = c.substring(c.indexOf("=") + 1);
	return temp;
}

function updateTotal()
{
	var allcookies = document.cookie;
	//alert(allcookies);
	var cookies = allcookies.split("; ");
	
	for(var i = 0; i < cookies.length; i++)
	{
		var keyValues = cookies[i].split("=");
		//alert(keyValues + 'value');

			
		for(var j = 0; j < keyValues.length; j++)
		{
			var quantity = keyValues[j].split(",");

			if(j%2 == 0)
			{
				scriptKey[i] = quantity;
				//alert("key=" + quantity);
			}
			
			if(j%2 ==1)
			{
				scriptValue[i] = parseInt(quantity);
				//alert("value=" + quantity);
			}
		}
	}
	
	var totalprice = 0;

	document.getElementById('orderedItems').innerHTML = '<table><tr><td width="80%">Product name</td><td width="10%">Quantity</td></td><td width="10%"></tr></table>';

	for (var k = 0; k < productArray.length; k++) 
	{
		//alert(scriptKey[k] + "=" + scriptValue[k]);
		
		var cost = costArray[k];
		var productText = productArray[k];

			if(scriptValue[k] > 0)
			{
				cost = parseFloat(cost) * 100;
				quantityArray[k] = scriptValue[k];
				totalprice = totalprice + (cost * quantityArray[k]);
				// alert(quantityArray[k] + 'cookie');
				document.getElementById('orderedItems').innerHTML = document.getElementById('orderedItems').innerHTML + "<br /><table><tr><td width='80%'>" + productArray[k] + "</td><td width='10%'>" + quantityArray[k] + "</td><td width='10%'>" + '<input type = "button" value="X" onclick="delallitem(' + "'" + productArray[k] + "', '" + k + "'" + ')"  />' + "</td></tr></table>";
			}
			//setCookie('quantity' + k, quantityArray[k]);
	}
	//alert(totalprice);
	
	total = totalprice;
	document.getElementById('total').innerHTML = (total / 100).toFixed(2);
}

function additem(name, productNo)
{
	var qty = document.getElementById(name).value;

	if(qty > 0)
	{
		var i = parseInt(productNo);
		var cost = costArray[i];
		var productText = productArray[i];

		cost = parseFloat(cost) * 100;
		total = total + (cost * qty);
		document.getElementById('total').innerHTML = (total / 100).toFixed(2);

		quantityArray[i] = parseInt(quantityArray[i]) + parseInt(qty);

		document.getElementById('orderedItems').innerHTML = '<table><tr><td width="80%">Product name</td><td width="10%">Quantity</td></td><td width="10%"></tr></table>';

		for(var j = 0; j < productArray.length; j++)
		{
			if(10 > j)
			{
				setCookie('quantity0' + j, quantityArray[j]);
			}

			if(10 <= j)
			{
				setCookie('quantity' + j, quantityArray[j]);
			}

			if(quantityArray[j] != 0 && quantityArray[j] > 0)
			{
				document.getElementById('orderedItems').innerHTML = document.getElementById('orderedItems').innerHTML + "<br /><table><tr><td width='80%'>" + productArray[j] + "</td><td width='10%'>" + quantityArray[j] + "</td><td width='10%'>" + '<input type = "button" value="X" onclick="delallitem(' + "'" + productArray[j] + "', '" + j + "'" + ')"  />' + "</td></tr></table>";
			}
		}
	}
	
	else
	{
		document.getElementById(name).focus();
		document.getElementById(name).select();
		alert('Input a number over 1');
	}
}

function deleteitem(name, productNo)
{
	var qty = document.getElementById(name).value;

	if(qty > 0)
	{
		var i = parseInt(productNo);
		var cost = costArray[i];
		var productText = productArray[i];

		if(quantityArray[i] >= qty)
		{
			cost = parseFloat(cost) * 100;
			total = total - (cost * qty);
			document.getElementById('total').innerHTML = (total / 100).toFixed(2);

			quantityArray[i] = parseInt(quantityArray[i]) - parseInt(qty);

			document.getElementById('orderedItems').innerHTML = '<table><tr><td width="80%">Product name</td><td width="10%">Quantity</td></td><td width="10%"></tr></table>';

			for(var j = 0; j < productArray.length; j++)
			{
				if(10 > j)
				{
					setCookie('quantity0' + j, quantityArray[j]);
				}

				if(10 <= j)
				{
					setCookie('quantity' + j, quantityArray[j]);
				}

				if(quantityArray[j] != 0 && quantityArray[j] > 0)
				{
					document.getElementById('orderedItems').innerHTML = document.getElementById('orderedItems').innerHTML + "<br /><table><tr><td width='80%'>" + productArray[j] + "</td><td width='10%'>" + quantityArray[j] + "</td><td width='10%'>" + '<input type = "button" value="X" onclick="delallitem(' + "'" + productArray[j] + "', '" + j + "'" + ')"  />' + "</td></tr></table>";
				}
			}
		}
	}
	
	else
	{
		document.getElementById(name).focus();
		document.getElementById(name).select();
		alert('Input a number');
	}
}

function delallitem(name, productNo)
{
	var i = parseInt(productNo);
	var cost = costArray[i];
	var productQty = quantityArray[i];
	var productText = productArray[i];

	if(quantityArray[i] > 0)
	{
		cost = parseFloat(cost) * 100;
		total = total - (cost * productQty);
		

		document.getElementById('total').innerHTML = (total / 100).toFixed(2);

		quantityArray[i] = 0;

		document.getElementById('orderedItems').innerHTML = '<table><tr><td width="80%">Product name</td><td width="10%">Quantity</td></td><td width="10%"></tr></table>';
 
		for(var j = 0; j < productArray.length; j++)
		{
			if(10 > j)
			{
				setCookie('quantity0' + j, quantityArray[j]);
			}

			if(10 <= j)
			{
				setCookie('quantity' + j, quantityArray[j]);
			}

			if(quantityArray[j] != 0 && quantityArray[j] > 0)
			{
				document.getElementById('orderedItems').innerHTML = document.getElementById('orderedItems').innerHTML + "<br /><table><tr><td width='80%'>" + productArray[j] + "</td><td width='10%'>" + quantityArray[j] + "</td><td width='10%'>" + '<input type = "button" value="X" onclick="delallitem(' + "'" + productArray[j] + "', '" + j + "'" + ')"  />' + "</td></tr></table>";
			}
		}
	}
}

function clearitem()
{
	for(var i = 0; i < productArray.length; i++)
	{
		quantityArray[i] = 0;
		
		if(10 > i)
		{
			setCookie('quantity0' + i, quantityArray[i]);
		}
		
		if(10 <= i)
		{
			setCookie('quantity' + i, quantityArray[i]);
		}
	}

	total = 0;

	document.getElementById('total').innerHTML = '0.00';
	document.getElementById('orderedItems').innerHTML = '';
}

function show_clock()
{
	var date = new Date();
	document.getElementById('ddate').innerHTML = "</br><table width='100%'><tr><td>" + date.toLocaleDateString() + "</td></tr><table>";
	document.getElementById('clock').innerHTML = "<table width='100%'><tr><td> Current time : " + date.toLocaleTimeString() + "</td></tr><table>";
	setTimeout("show_clock()",1000);
}

function updateTotalForCheckout()
{
	var allcookies = document.cookie;
	var cookies = allcookies.split("; ");
	var no = 1;
	
	for(var i = 0; i < cookies.length; i++)
	{
		var keyValues = cookies[i].split("=");

			
		for(var j = 0; j < keyValues.length; j++)
		{
			var quantity = keyValues[j].split(",");

			if(j%2 == 0)
			{
				scriptKey[i] = quantity;
			}
			
			if(j%2 ==1)
			{
				scriptValue[i] = parseInt(quantity);
			}
		}
	}
	
	var totalprice = 0;

	document.getElementById('orderedItemsforsend').innerHTML = '';
	document.getElementById('orderedItems').innerHTML = '<table style="text-align: center"><tr><td width="400px">Product name</td><td width="100px">Quantity</td></tr></table>';

	for (var k = 0; k < productArray.length; k++) 
	{
		var cost = costArray[k];
		var productText = productArray[k];

			if(scriptValue[k] > 0)
			{
				cost = parseFloat(cost) * 100;
				quantityArray[k] = scriptValue[k];
				totalprice = totalprice + (cost * quantityArray[k]);
				document.getElementById('orderedItemsforsend').innerHTML = document.getElementById('orderedItemsforsend').innerHTML + '<input type="hidden" name="ordereditem' + no + '" value="' + productArray[k] + ', ' + quantityArray[k] + '" />';
				document.getElementById('orderedItems').innerHTML = document.getElementById('orderedItems').innerHTML + "<table><tr><td width='400px'>" + productArray[k] + "</td><td  style='text-align: center' width='100px'>" + quantityArray[k] + "</td></tr></table>";
				no++;
			}
	}
	
	total = totalprice;
	document.getElementById('orderedItemsforsend').innerHTML = document.getElementById('orderedItemsforsend').innerHTML + '<input type="hidden" name="Total: $" value="' + (total/100).toFixed(2) + '" />';
	document.getElementById('total').innerHTML = '<table style="text-align: center"><tr><td width="400px">Total Price</td><td width="100px">$' + (total / 100).toFixed(2) + '</td></tr></table>';
}