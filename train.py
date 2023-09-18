import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

def load_data(csv_file):
    df = pd.read_csv(csv_file)
    X = df.iloc[:, :-1].values.astype(np.float32)
    y = df.iloc[:, -1].values.astype(np.float32)
    return X, y

# Define and compile your model
def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(10, input_shape=(8,), activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Train and save the model
def train_and_save_model(csv_file, model_save_path):
    X, y = load_data(csv_file)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = create_model()
    model.fit(X_train, y_train, epochs=100)

    # Save the model
    model.save(model_save_path)

    return model
  
def load_saved_model(model_path):
    loaded_model = tf.keras.models.load_model(model_path)
    return loaded_model

def predict(input_data):
    loaded_model = load_saved_model('./test.h5')
    prediction = loaded_model.predict(input_data)
    return prediction
    

if __name__ == "__main__":
    # csv_file = './diabetes.csv'
    # model_save_path = './test.h5'

    # trained_model = train_and_save_model(csv_file, model_save_path)
    # print("Model trained and saved successfully.")
    predictions = predict(np.array([[6,148,72,35,0,33.6,0.627,50]], dtype=np.float32))
    print("Predictions:", predictions)
