import os
import shutil

# Specify the paths to the raw folder, states folder, and new_states folder
raw_folder = r'C:\Users\jicfo\OneDrive\Desktop\pictureScript\rawDump3'
states_folder = r'C:\Users\jicfo\OneDrive\Desktop\pictureScript\states'
new_states_folder = r'C:\Users\jicfo\OneDrive\Desktop\pictureScript\newStates'

# Create the new_states folder if it doesn't exist
os.makedirs(new_states_folder, exist_ok=True)

# Retrieve the list of state folders from the states folder
state_folders = [folder for folder in os.listdir(states_folder) if os.path.isdir(os.path.join(states_folder, folder))]

# Iterate through each state folder
for state_folder in state_folders:
    # Create the corresponding state folder in the new_states folder
    new_state_folder = os.path.join(new_states_folder, state_folder)
    os.makedirs(new_state_folder, exist_ok=True)
    
    # Retrieve the list of files and subfolders in the state folder
    state_path = os.path.join(states_folder, state_folder)
    for root, dirs, files in os.walk(state_path):
        # Iterate through each file in the state folder and its subfolders
        for filename in files:
            # Check if the file is an image (you can add more image file extensions if needed)
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.heic')):
                # Construct the relative path of the file within the state folder
                relative_path = os.path.relpath(root, state_path)
                new_state_subfolder = os.path.join(new_state_folder, relative_path)
                os.makedirs(new_state_subfolder, exist_ok=True)
                
                # Check if the file exists in the raw folder (ignoring file extensions)
                raw_filename = os.path.splitext(filename)[0]
                raw_files = [file for file in os.listdir(raw_folder) if os.path.splitext(file)[0].lower() == raw_filename.lower()]
                
                if len(raw_files) > 0:
                    # Copy the full-quality image to the new state folder
                    raw_filepath = os.path.join(raw_folder, raw_files[0])
                    shutil.copy2(raw_filepath, new_state_subfolder)
                else:
                    # Copy the image from the state folder to the "not found" folder
                    not_found_subfolder = os.path.join(new_states_folder, 'not found')
                    os.makedirs(not_found_subfolder, exist_ok=True)
                    original_filepath = os.path.join(root, filename)
                    shutil.copy2(original_filepath, not_found_subfolder)
print("Image copying completed.")
