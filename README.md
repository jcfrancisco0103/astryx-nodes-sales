# AstryxNodes Sales Management

A beautiful nebula-themed sales management website for AstryxNodes Minecraft server hosting business.

## Features

- 🌌 **Nebula Theme**: Stunning space-themed design with animated backgrounds
- 📊 **Dashboard**: View total sales, VPS costs, Panel costs, and net profit
- 💰 **Sales Management**: Add, view, and manage customer sales
- 🎨 **Smooth Animations**: Page transitions and interactive animations
- 📱 **Responsive Design**: Works on all devices

## Installation

1. Navigate to the project directory:
```bash
cd astryx-nodes-sales
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Usage

### Home Page
- View total sales, VPS costs, Panel costs, and net profit
- Update VPS and Panel costs in the settings section

### Sales Management Page
- Click "Add New Sale" to add a new customer sale
- Select from predefined plans (Pig, Sheep, Cow, Creeper, Zombie, Skeleton) or create a custom plan
- Enter customer name, purchase date, expiration date, and amount
- View all sales in an organized card layout
- Delete sales by clicking the delete button

## Plans

- **Pig Plan**: 2GB RAM, 100% CPU, 5GB Disk
- **Sheep Plan**: 4GB RAM, 100% CPU, 10GB Disk
- **Cow Plan**: 6GB RAM, 150% CPU, 20GB Disk
- **Creeper Plan**: 8GB RAM, 150% CPU, 30GB Disk
- **Zombie Plan**: 10GB RAM, 200% CPU, 35GB Disk
- **Skeleton Plan**: 12GB RAM, 250% CPU, 40GB Disk
- **Custom Plan**: Manually specify RAM, CPU, and Disk

## Data Storage

All data is stored locally in your browser using localStorage. Your sales and settings will persist between sessions.

## Technologies Used

- React 18
- React Router DOM
- Framer Motion (for animations)
- CSS3 (for nebula theme and styling)
