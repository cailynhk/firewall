% Set up Python environment
pyenv(Version=3.10);

% Import TensorFlow module
tf = py.importlib.import_module('tensorflow');

% Load the image
image = imread('./admin-app/cnn/test_img/test_high.jpg');

% Resize the image to the required input size of the model (e.g., 224x224)
img_resized = imresize(image, [224, 224]);

% Normalize the image
img_normalized = double(img_resized) / 255.0;

% Convert the image to a TensorFlow tensor
img_tensor = tf.convert_to_tensor(img_normalized, 'float32');

% Add batch dimension
img_tensor = tf.expand_dims(img_tensor, 0);

% Load the SavedModel
saved_model = tf.saved_model.load('./converted_savedmodel');

output = saved_model.signatures('serving_default').call(img_tensor);

disp(output);
