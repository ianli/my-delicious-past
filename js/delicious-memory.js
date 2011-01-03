function deliciousLinksHtml(month, date) {
	var backgroundPage = chrome.extension.getBackgroundPage();

	var $display = $("#display");
		$display.empty();
	
	// The list of posts for today
	var todaysPosts = backgroundPage.deliciousXML.postsByDate(month, date);
	
	if (!backgroundPage.deliciousXML.xml()) {
		// The user has not set the XML.
		$display.append(
			'<div class="pad">'
			+ 'You need to download your Delicious bookmarks. '
			+ '<a href="options.html" target="_blank">Download now.</a>'
			+ '</div>'
		);
	} else if (todaysPosts.length > 0) {
		// There are posts for today. Prepare the HTML...
		
		var monthNames = [
			"January", "February", "March",
			"April", "May", "June",
			"July", "August", "September",
			"October", "November", "December"
		];

		// Show the date information.
		
		var now = new Date();
		$("#info").show();
		$("#info_date").html(monthNames[now.getMonth()] + " " + now.getDate());
		
		// Show the list of posts for today.
	
		var $list = $("<ul></ul>").appendTo($display);
	
		$.each(todaysPosts, function (i, post) {
			$("<li></li>")
			.append(
				$("<a></a>")
					.attr("href", post.href)
					.attr("target", "_new")
					.append(
						$("<span class='date'></span>")
							.html(post.time.getFullYear())
					)
					.append(post.description)
					.append("<br/>")
					.append(
						$("<span class='tags'></span>")
							.html(post.tags.join(", "))
					)
			)
			.appendTo($list);
		});
	} else {
		// The user doesn't have posts for today.
		$display.append(
			'<div class="pad">'
			+ 'Awww! You don\'t have any bookmarks for this date :('
			+ '</div>'
		);
	}
}