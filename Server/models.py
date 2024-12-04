from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-products.owner',) 
    
    
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    
   
    products = db.relationship('Product', back_populates='owner', )

    def __repr__(self):
        return f'<id {self.username}>'

class Product(db.Model,SerializerMixin):
    __tablename__ ='products'
    serialize_rules = ('-owner.products','-reviews.product',) 

    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=True)
    image = db.Column(db.String, nullable=True)
    
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    owner = db.relationship('User', back_populates='products')
    reviews = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<name:{self.name} category{self.category} price{self.price}>'
    

class Review(db.Model,SerializerMixin):
    __tablename__='reviews'
    serialize_rules=('-product.reviews',)
        

    id =db.Column(db.Integer,primary_key=True)
    content=db.Column(db.String,nullable=False)
    rating=db.Column(db.Integer,nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)  

    product = db.relationship('Product', back_populates='reviews')  

    def __repr__(self):
         return f'<Review id: {self.id}, product_id: {self.product_id}, rating: {self.rating}>'


       
    


