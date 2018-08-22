$(function(){

	var key = 'dkyjtI8PDoKqij7HHesYqUpfcOQBm2pu'

	let urlProjects = 'https://api.behance.net/v2/users/hochburg/projects?client_id='+ key;
	let urlStats = 'https://api.behance.net/v2/users/hochburg/stats?client_id='+ key;

	$.ajax({
			url: urlStats,
			dataType: 'jsonp',
			success: function(res){

				$('.profile-views').append(': ' + numeral(res.stats.all_time.profile_views).format('0,0'));
				$('.project-appreciations').append(': ' + numeral(res.stats.all_time.project_appreciations).format('0,0'));
				$('.project-comments').append(': ' + numeral(res.stats.all_time.project_comments).format('0,0'));
				$('.project-views').append(': ' + numeral(res.stats.all_time.project_views).format('0,0'));
			}
		})


	if($('#index').length > 0){
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){
				
				_(res.projects).each(function(project,i){

					$('<li><h1>'+ project.name +'</h1><img src="'+ project.covers.original +'" alt=""> <a href="project.html?id='+project.id+'"> See More </a></li>').appendTo('ul.projects')
				
					if(i<3){
						$('<div class="swiper-slide slide-image" style="background-image: url('+ project.covers.original  +');"><div class="swiper-inner"><span>'+ project.name +'</span><a href="project.html?id='+project.id+'"> View Project </a></div></div>').appendTo('.swiper-wrapper')
					}
				});

				var swiper = new Swiper('.swiper-container', {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						dynamicBullets: true,
					}
				});

				//if lates 3

			}
		})
	}

	if($('#project').length > 0) {
		let pageURL = new URL(document.location);
		let params = pageURL.searchParams;
		let projectID = params.get('id')

		let urlProject = 'https://api.behance.net/v2/projects/'+ projectID +'?api_key='+ key;

		var projectComments = 'https://api.behance.net/v2/projects/'+ projectID +'/comments?api_key='+ key;

		console.log(projectComments);
		console.log(urlProject);

		$.ajax({
			url: urlProject,
			dataType: 'jsonp',
			success: function(res){

				console.log(res)
				let project = res.project;

				$('.container').append(
					'<div class="project-content">\
					<h1 class="project-content-heading">'+ project.name +'</h1>\
					<p class="project-content-description">'+ project.description +'</p>\
					<h3 class="project-content-date">'+ moment.unix(project.published_on).fromNow() +'</h3>\
					</div>\
					<div class="project-image">\
					<img src="'+ project.covers.original +'" alt="">\
					</div>\
					<div class="gallery"></div>\
					<div class="comments">\
					<p class="comments-heading">See our latest 5 comments</p></div>');
			



				$.ajax({
					url:projectComments,
					dataType:'jsonp',
					success:function(res){
						var comments = res.comments;

						_(comments).each(function(comment,i){
							if(i<5){
								$('<div class="comment"><span>'+ comment.comment +'</span><span class="user-first">'+ comment.user.first_name +'</span></div>').appendTo('.comments')
							}
						});
					}
				});

				lightbox.option({
					'alwaysShowNavOnTouchDevices': true
				})


				_(project.modules).each(function(images,i){
					if(i > 0){
						$('<div class="gallery-item"><a href="'+ images.src +'" data-lightbox="'+ images.project_id +'"><img src="'+ images.src +'" alt=""></div>').appendTo('.gallery');
					}
				});
			}
		})
	}
	
});