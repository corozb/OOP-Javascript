const form = document.querySelector('#product-form'),
	container = document.querySelector('.container'),
	app = document.querySelector('#App'),
	list = document.querySelector('#product-list')

class Product {
	constructor(name, price, year) {
		this.name = name
		this.price = price
		this.year = year
	}
}

class UI {
	addProduct(product) {
		const element = document.createElement('div')
		element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product</strong>: ${product.name}
          <strong>Price</strong>: ${product.price}
          <strong>Year</strong>: ${product.year}
          <a href="#" class="btn btn-danger" name='delete'>Delete</a>
        </div>
      </div>
    `
		list.appendChild(element)
		form.reset()
	}

	deleteProduct(element) {
		if (element.name === 'delete') {
			element.parentElement.parentElement.remove()
			this.showMessage('Product Deleted Succsssfully', 'success')
		}
	}

	showMessage(message, cssClass) {
		const div = document.createElement('div')
		div.className = `alert alert-${cssClass} mt-2`
		div.appendChild(document.createTextNode(message))

		container.insertBefore(div, app)

		setTimeout(() => {
			const alertMessage = document.querySelector('.alert')
			alertMessage.remove()
		}, 2000)
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const name = document.querySelector('#name').value,
		price = document.querySelector('#price').value,
		year = document.querySelector('#year').value

	const product = new Product(name, price, year)
	const ui = new UI()

	if ((name === '') | (price === '') | (year === '')) {
		ui.showMessage('Please Insert data in all fields', 'danger')
	} else {
		ui.showMessage('Product Added Successfully', 'success')
		ui.addProduct(product)
	}
})

list.addEventListener('click', (e) => {
	e.preventDefault()

	const ui = new UI()
	ui.deleteProduct(e.target)
})
