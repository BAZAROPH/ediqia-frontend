class mAlerts {
	constructor() {
		this.data = false;
	}

	warning(root, title, content) {
		root
			.$swal({
				title: title,

				text: content,

				icon: 'warning',

				showCancelButton: true,

				confirmButtonText: 'Oui',

				customClass: {
					confirmButton: 'btn btn-primary',

					cancelButton: 'btn btn-outline-danger ml-1',
				},

				buttonsStyling: false,
			})
			.then((response) => {
				if (response.isConfirmed === true) {
					this.data = true;
				}
			});
		return { isValide: this.data };
	}
}

export default new mAlerts();
