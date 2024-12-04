import random
from app import app
from models import db, User, Product, Review
from faker import Faker

fake = Faker()

# Predefined lists of grocery items and categories
product_names = [
    "Apples", "Bananas", "Grapes", "Oranges", "Salmon", 
    "Potatoes", "Chicken Breast", "Eggs", "Milk", "Eggs"
    
]

categories = [
    "Fruits", "Vegetables", "Dairy", "Meat", "Seafood", 
    "Bakery", "Grains", "Condiments", "Snacks", "Beverages"
]


grocery_reviews = [
    "Fresh and crisp, just as expected!",
    "The flavor was amazing and really juicy.",
    "A bit overripe, but still good.",
    "Great quality, will buy again!",
    "Not as fresh as I hoped, but decent.",
    "Perfectly cooked and delicious!",
    "Tender and flavorful, very satisfied.",
    "A bit too salty for my taste.",
    "High quality and great taste!",
    "The texture wasn't the best, but the flavor made up for it."
]

image_urls= {
    "Apples": "https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg",
    "Potatoes": "https://cdn.pixabay.com/photo/2019/07/12/02/19/potatoes-4331742_1280.jpg",
    "Oranges": "https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg",
    "Bananas":"https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=2048x2048&w=is&k=20&c=oz3Xd4SKjKrMrc2JX0pqworegOshV9YMl2GUbpVI338=",
    "Chicken Breast": "https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=600",
    "Salmon": "https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=600",
    
    "Eggs": "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=600",
    
    "Milk": "https://images.pexels.com/photos/799273/pexels-photo-799273.jpeg?auto=compress&cs=tinysrgb&w=600",

    "Grapes": "https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=600"
}

descriptions = {
    "Apples": "Crisp and juicy, perfect for a healthy snack or adding to salads. Full of vitamins and natural sweetness.",
    "Bananas": "Sweet and creamy, these bananas are perfect for smoothies, snacks, or baking. Packed with potassium and energy.",
    "Grapes": "Fresh, sweet, and bursting with flavor. A great snack on the go or a perfect addition to fruit salads.",
    "Oranges": "Zesty and full of vitamin C, these oranges are juicy and refreshing, ideal for juicing or snacking.",
    "Salmon": "Rich and flavorful, this fresh salmon is perfect for grilling or baking, packed with omega-3 fatty acids.",
    "Potatoes": "Versatile and hearty, these potatoes are perfect for roasting, mashing, or frying. A great source of fiber.",
    "Chicken Breast": "Lean and tender, ideal for healthy meals. Perfect for grilling, baking, or stir-frying.",
    "Eggs": "Farm-fresh eggs, perfect for breakfast, baking, or adding to your favorite recipes. Rich in protein.",
    "Milk": "Creamy and wholesome, our milk is perfect for drinking, baking, or adding to coffee and cereals."
}


      



    








if __name__ == '__main__':
    with app.app_context():
        print('Clearing db...')
        User.query.delete()
        Product.query.delete()
        Review.query.delete()

        print("Seeding users...")
        users = []  
        for i in range(20):
            user = User(
                username=fake.user_name(),  
                password=fake.password()
            )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        print("Seeding products...")
        products = []
        for _ in range(30):
            product_name=random.choice(product_names)  
            product = Product(
                name=product_name, 
                category=random.choice(categories),
                price=round(fake.random_number(digits=2, fix_len=False) + random.uniform(0, 1), 2), 
                quantity=fake.random_int(min=1, max=100),
                description=descriptions.get(product_name),
                image=image_urls.get(product_name, "https://default-image-url.com"),
                user_id=random.choice(users).id  
            )
            products.append(product)

        db.session.add_all(products)
        db.session.commit()

        print("Seeding reviews...")
        reviews = []
        for _ in range(40):  
            review = Review(
                content=random.choice(grocery_reviews),  
                rating=random.randint(1, 10),  
                product_id=random.choice(products).id  
            )
            reviews.append(review)

        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding completed!")