const form = document.getElementById('bookForm');
const bookListEl = document.getElementById('book-list');
const ws = new WebSocket(window.location.protocol === 'https:' ? 'wss://' : 'ws://' + window.location.host);

ws.onmessage = (event) => {
            const books = JSON.parse(event.data);

            bookListEl.innerHTML = ''; 
            books.forEach((book) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.name}</td>
                    <td>${book.quantity}</td>
                    <td>${book.price}</td>
                `;
                bookListEl.appendChild(row);
            });
};

form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            const price = parseFloat(document.getElementById('price').value).toFixed(2);

            ws.send(JSON.stringify({ name, quantity, price }));
            form.reset();
});