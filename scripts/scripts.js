$(function(){

	var key = 'XoduXB60sBkiKQTdWMHY7nhQ4zaJZ7tz'

	let urlProjects = 'https://api.behance.net/v2/users/hochburg/projects?client_id='+ key;


	if($('#index').length > 0){
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){

				console.log(res);
				
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

		console.log(pageURL);

		let urlProject = 'https://api.behance.net/v2/projects/'+ projectID +'?api_key='+ key;

		$.ajax({
			url: urlProject,
			dataType: 'jsonp',
			success: function(res){
				let project = res.project;


				$('<h1>'+ project.name +'</h1>').appendTo('.container')
				$('<p>'+ project.description +'</p>').appendTo('.container')
				$('<h3>'+ moment.unix(project.published_on).fromNow() +'</h3>').appendTo('.container')
				$('<img src="'+ project.covers.original +'" alt="">').appendTo('.container')
			}
		})
	}
	
});