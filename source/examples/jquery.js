(() => {
	const REST_RESOURCE = {
		$id: "id",
		update: {
			$method: trocha.PATCH,
			$hide: true
		},
		list: {
			$hide: true,
			$id: false
		},
		new: {
			$id: false
		},
		show: {
			$hide: true
		}
	};
	const serverRoutes = trocha({
		domain:'http://jsonplaceholder.typicode.com',
		alwaysUrl: true,
		resource: REST_RESOURCE,
		routes: {
			posts: {
				$type: trocha.RESOURCE,
				$id: 'postId'
			},
			users: {
				$type: trocha.RESOURCE,
				$id: 'userId'
			}
		}
	});

	const doJqueryXHR = (route, path, data) => {
		return $.ajax({
			method: route.$method,
			url: route.path(path),
			data: data
		})
	};

	const printMessage = ( msg ) => {
		console.log(JSON.stringify(msg));
		$("#message").text(JSON.stringify(msg))
	}

	$( document ).ready(() => {
		$( "#getPost" ).on( "click", ( event ) => doJqueryXHR(serverRoutes.posts.show,{postId: 1}).done(printMessage));
		$( "#getUser" ).on( "click", ( event ) => doJqueryXHR(serverRoutes.users.show,{userId: 1}).done(printMessage));
	})
})();
