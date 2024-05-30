import connection from '../config/conn.js'

// controller to get all auctions  details 
export const getAllAuction = async (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch auctions' });
            return;
        }
        res.json(results);
    });
}

//controller to get specific auction by id
export const getAuctionbyId = async (req, res) => {  
    const { id } = req.params;
    if(!id){
        res.status(400).json({error:"id is missing"})
        return;
    }
    connection.query('SELECT * FROM items WHERE items_id=?', [id], (err, results) => { 
        if (err) {
            res.status(500).json({ error: 'Failed to fetch auctions' });
            return;
        }
        if (results === 0) {
            res.status(404).json({ error: "no Data Found" })
            return
        }
        res.json(results);
    });
}
//controller for creating a auction
export const creataAuction = async (req, res) => {
    const { name, description, starting_price, end_time, image_url } = req.body;
    //checking if any field is missing
    if(!name || !description || !starting_price || !end_time || !image_url){ 
        res.status(400).json({error:"missing fields"})
        return;
    }
    //query to insert data into database
    const query = 'INSERT INTO items (name, description, starting_price, current_price, end_time, image_url) VALUES (?, ?, ?, ?, ?, ?)'; 
    connection.query(query, [name, description, starting_price, starting_price, end_time, image_url], (error, results) => {
        if (error) {
            console.error('Error creating auction:', error);
            res.status(500).json({ error: 'Failed to create auction' });
            return;
        }
        // Get the ID of the newly inserted item
        const newItemId = results.insertId; 
        // Respond with the newly created item
        res.status(201).json({ 
            id: newItemId,
            name,
            description,
            starting_price,
            current_price: starting_price,
            end_time,
            image_url
        });
    });
};

//controller for updating auction
export const updateAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, starting_price, current_price, end_time, image_url } = req.body;
         //checking if any field is missing
        if(!id || !name || !description || !starting_price || !current_price || !end_time || !image_url){      
            res.status(400).json({error:"missing fields"})
            return;
         }
        const [result] =  connection.query(
            'UPDATE items SET name = ?, description = ?, starting_price = ?, current_price = ?, end_time = ?, image_url = ? WHERE id = ?',
            [name, description, starting_price, current_price, end_time, image_url, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, name, description, starting_price, current_price, end_time, image_url });
        } else {
            res.status(404).json({ error: 'Auction not found' });
        }
    } catch (error) {
        console.error('Error updating auction:', error);
        res.status(500).json({ error: 'Failed to update auction' });
    }
}
// controller for delete specific controller
export const deleteAuction = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            res.status(400).json({error:"id is missing"})
            return;
        }
        const [result] = connection.query('DELETE FROM items WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Auction deleted successfully' });
        } else {
            res.status(404).json({ error: 'Auction not found' });
        }
    } catch (error) {
        console.error('Error deleting auction:', error);
        res.status(500).json({ error: 'Failed to delete auction' });
    }
}