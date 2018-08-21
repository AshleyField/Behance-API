$(function(){

	var key = 'XoduXB60sBkiKQTdWMHY7nhQ4zaJZ7tz'

	let urlProjects = 'https://api.behance.net/v2/users/pervinozcan/projects?client_id='+ key;


	if($('#index').length > 0){
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){

				console.log(res);
				
				_(res.projects).each(function(project){

					$('<li>'+ project.name +'<img src="'+ project.covers.original +'" alt=""> <a href="project.html?id='+project.id+'"> See More </a></li>').appendTo('ul.projects')
				});
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