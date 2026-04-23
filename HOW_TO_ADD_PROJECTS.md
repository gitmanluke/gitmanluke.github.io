# How to Add New Projects to Your Portfolio

Your portfolio now uses a simple JSON-driven system. Adding new projects is easy!

## Quick Steps

1. **Add your project image**
2. **Edit the JSON file**
3. **Commit and push**

That's it! Your project will automatically appear on your website.

---

## Detailed Instructions

### Step 1: Add Your Project Image

1. Create a folder for your project in `images/projects/`:
   ```bash
   mkdir images/projects/your-project-name
   ```

2. Copy your project image into this folder and name it `main.png` or `main.jpg`:
   ```bash
   cp ~/path/to/your-image.jpg images/projects/your-project-name/main.jpg
   ```

**Tip:** Use lowercase letters and hyphens for folder names (e.g., `robot-arm-manipulator`, not `Robot Arm Manipulator`)

---

### Step 2: Edit the JSON File

1. Open `assets/data/projects.json` in any text editor

2. Copy this template:
   ```json
   {
     "id": "project-name-lowercase",
     "title": "Your Project Title",
     "description": "Detailed description of your project. What did you build? What technologies did you use? What problem does it solve?",
     "image": {
       "src": "images/projects/project-name-lowercase/main.jpg",
       "alt": "Descriptive text for screen readers"
     },
     "metadata": {
       "date": "2026-01-27",
       "category": "robotics",
       "featured": true,
       "status": "completed"
     }
   }
   ```

3. Fill in your project details:
   - **id**: Lowercase with hyphens (must match folder name)
   - **title**: Display name of your project
   - **description**: Full project description
   - **image.src**: Path to your image
   - **image.alt**: Describe the image for accessibility
   - **date**: Today's date in YYYY-MM-DD format
   - **category**: See categories below
   - **featured**: `true` to show on home page, `false` for projects page only
   - **status**: "completed", "in-progress", or "planned"

4. Add your project object to the `projects` array (don't forget the comma between projects!):
   ```json
   {
     "projects": [
       {
         "id": "boat-autonomous-transport",
         ...existing project...
       },
       {
         "id": "your-new-project",
         ...your new project here...
       }
     ]
   }
   ```

5. Save the file

---

### Step 3: Commit and Push

```bash
git add images/projects/your-project-name/
git add assets/data/projects.json
git commit -m "Add [project name] to portfolio"
git push origin main
```

Your project will appear automatically on your website!

---

## Example: Adding a Robot Arm Project

Let's add a new robot arm project step by step:

### 1. Add the image
```bash
mkdir images/projects/robot-arm-manipulator
cp ~/Desktop/robot_arm.jpg images/projects/robot-arm-manipulator/main.jpg
```

### 2. Edit projects.json

Open `assets/data/projects.json` and add:

```json
{
  "id": "robot-arm-manipulator",
  "title": "6-DOF Robot Arm Manipulator",
  "description": "Designed and built a 6-axis robotic arm with inverse kinematics control for precise object manipulation. Programmed using ROS and Arduino for real-time motion planning.",
  "image": {
    "src": "images/projects/robot-arm-manipulator/main.jpg",
    "alt": "Six degree of freedom robot arm with gripper"
  },
  "metadata": {
    "date": "2026-01-15",
    "category": "robotics",
    "featured": true,
    "status": "completed"
  }
}
```

**Important:** Add a comma after the previous project before adding your new one!

### 3. Commit and push
```bash
git add .
git commit -m "Add robot arm manipulator project"
git push origin main
```

Done! Visit your website to see the new project.

---

## Project Categories

Use these consistent category names:

- **robotics** - Autonomous systems, robot arms, drones
- **3d-printing** - CAD designs, printed objects
- **web-dev** - Websites, web applications
- **mechanical** - Mechanical engineering projects
- **electrical** - Circuit design, PCBs, embedded systems
- **software** - Software applications, algorithms

---

## Featured Projects

Projects with `"featured": true` will appear on your home page in the "Featured Projects" section. Only your top 3 featured projects will be shown.

**Tips for featured projects:**
- Choose your best work
- Make sure the description is compelling
- Use high-quality images
- These are the first projects employers see!

---

## Common Issues

### JSON Syntax Errors

**Problem:** Website doesn't load projects

**Solution:**
1. Check for missing commas between project objects
2. Ensure all quotes are matching pairs (`"` not `"` or `"`)
3. Validate your JSON at https://jsonlint.com/

### Image Not Showing

**Problem:** Image doesn't appear on the website

**Solution:**
1. Check the image path matches the folder name exactly
2. Make sure the image is named `main.png` or `main.jpg`
3. Verify the image was committed to git (`git status`)

### Project Not Appearing

**Problem:** Added project but it's not on the website

**Solution:**
1. Check you saved the `projects.json` file
2. Verify JSON syntax is correct
3. Make sure you pushed to GitHub (`git push`)
4. Wait 1-2 minutes for GitHub Pages to rebuild

---

## Testing Locally

Before pushing to GitHub, you can test locally:

1. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser to `http://localhost:8000`

3. Check the browser console (F12) for any errors

4. Test both `index.html` and `projects.html`

---

## Need Help?

- **JSON Validation:** https://jsonlint.com/
- **Image Optimization:** Consider using WebP format for smaller file sizes
- **Git Issues:** Run `git status` to check what's staged

---

## Quick Reference Card

```bash
# Full workflow
mkdir images/projects/my-new-project
# Add your image as main.jpg or main.png
# Edit assets/data/projects.json
git add .
git commit -m "Add my new project"
git push origin main
```

That's it! Happy showcasing! 🚀
