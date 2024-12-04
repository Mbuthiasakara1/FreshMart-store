from flask import Flask,make_response,request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

from models import db,User,Product,Review
from flask_restful import Resource,Api
from sqlalchemy.exc import SQLAlchemyError

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] ="sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True 



migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
bcrypt = Bcrypt(app)
#for secret key
app.secret_key=os.urandom(24)
CORS(app)

@app.before_request
def require_login():
    if request.endpoint == 'users' and request.method == 'GET' and 'user_id' not in session:
        return jsonify (
            {
                "message":"Please log in to acess this resource"
            },403
        ) 

            
        

class Products(Resource):
    def get(self):
        products_dict=[product.to_dict(only=('id','category','price','description','name','image', 'quantity'))for product in Product.query.all()]
        return make_response(products_dict,200)
    
    def post(self):
        try:
            new_product=Product(
                name=request.json['name'],
                category=request.json['category'],
                price=request.json['price'],
                quantity=request.json['quantity'],
                description=request.json['description'],
                image=request.json['image'],
                user_id=request.json.get('user_id')
)
            db.session.add(new_product)  
            db.session.commit()  
            return make_response(new_product.to_dict(),201)
             
        except SQLAlchemyError as e:
            db.session.rollback()  
            return{
                "errors":["validation errors"]
            },400  


            

    
    
class Products_By_Id(Resource):
    def get(self,id):
        product=Product.query.filter(Product.id==id).first()
        if product:
            product_dict={
                'id': product.id,
                'name': product.name,
                'category': product.category,
                'price': product.price,
                'quantity': product.quantity,
                'description': product.description,
                'image': product.image

            }
            response =make_response(product_dict,200)#helps hide user credetianls
            return response
           
        else:
           response_body={
               "error":"Product not found"
               
           }
           return make_response(response_body,404)
        
    def patch(seld,id):
        product=Product.query.filter(Product.id == id).first()

        if product:
            data=request.get_json()
            for attr ,value in data.items():
              setattr(product,attr,value)

            db.session.add(product)   
            db.session.commit() 

            response_dict=product.to_dict(only=('id','category','price','description','name','image'))

            response=make_response(
            response_dict,200
             )
            return response
        else:
            response_body={"error":"Product not found"}
            response =make_response(response_body,401)
            return response

        
    def delete(self,id):
        product=Product.query.filter(Product.id==id).first()
        db.session.delete(product)
        db.session.commit()

        response_dict={
            "message":"product deleted sucessfully"

        }
        response=make_response(
            response_dict,200
        )
        return response
    

class Users(Resource):
    
    def get(self):
        if 'user_id' not in session:
            return {"message":"PLease log in to acess the resources"},403
        
        users_dict=[user.to_dict(only=('id','username'))for user in User.query.all()]
        return make_response(users_dict,200)
    
    
    def post(self):
        username=request.json.get("username")
        password=request.json.get("password")

        hashed_pass=bcrypt.generate_password_hash(password).decode("utf-8")
        new_user=User(username=username,password=hashed_pass)
        db.session.add(new_user)
        db.session.commit()
        return {
            "message":"User succesfully created"
        }
# The Users class is for managing user data, allowing new users to be created (registered) and existing users to be retrieved. This is directly connected to the login functionality because only users registered through this class can log in with their credentials.
#this is ythe sign up
    
class Users_By_Id(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
           
            user_dict = {
                'id': user.id,
                'username': user.username,

            }
            return make_response(user_dict, 200)
        else:
            response_body = {
                "error": "User not found"
            }
            return make_response(response_body, 404)
        
class Login(Resource):
    def post(self):
        username = request.json.get("username")
        password = request.json.get("password")   

        user=User.query.filter_by(username=username).first() 
        if user and bcrypt.check_password_hash(user.password,password):
         session["user_id"]=user.id

         return make_response( {
            "message":"Login successfull"
         },200)
        return make_response({
            "message":"Invalid Credentials"
        },404)
    
    #this is the login

class Logout(Resource):
    def post(self):
        session.pop('user_id',None)

        return jsonify({
            "message":"Logout sucessfully"
        })
        



        



        
        
class Reviews(Resource):
    def get(self):
        reviews_dict=[review.to_dict(only=('id','content','rating'))for review in Review.query.all()]
        return make_response(reviews_dict,200)        


    


  

        




api.add_resource(Users,'/users')
api.add_resource(Users_By_Id,'/users/<int:id>')

api.add_resource(Products,'/products')
api.add_resource(Products_By_Id,'/products/<int:id>')

api.add_resource(Reviews,'/reviews')
api.add_resource(Login,'/login')
api.add_resource(Logout,'/logout')


if __name__ == "__main__":
    app.run(port=5555,debug=True)