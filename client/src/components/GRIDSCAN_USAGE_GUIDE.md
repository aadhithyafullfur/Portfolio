# GridScan Background - Usage Guide

## 📦 Components Created

### 1. **BackgroundGrid.jsx**
Professional full-screen grid scan background component.

### 2. **HeroSection.jsx**
Example implementation showing proper usage with content.

---

## 🎨 Color Palette (Strictly Used)

```css
Primary Purple:    rgb(120, 50, 180)  - Grid lines, main accent
Glow Highlights:   rgb(170, 120, 220) - Scan animation, buttons
Shadow Purple:     rgb(75, 30, 120)   - Depth, overlays
Background Black:  rgb(0, 0, 0)       - Base background
```

---

## 🚀 Quick Start

### **Option 1: Use in Existing App.js**

```jsx
import BackgroundGrid from './components/BackgroundGrid';

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Add background grid */}
      <BackgroundGrid />
      
      {/* Your content - z-10 or higher to appear above grid */}
      <main className="relative z-10">
        {/* Your sections here */}
      </main>
    </div>
  );
}
```

### **Option 2: Use the Complete Hero Example**

```jsx
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="bg-black">
      <HeroSection />
      {/* Other sections */}
    </div>
  );
}
```

---

## ⚙️ Configuration Explained

### **Performance Optimizations**

```jsx
enableWebcam={false}     // No face tracking = better performance
showPreview={false}      // No preview UI = cleaner look
enableGyro={false}       // No device orientation = stable background
scanOnClick={false}      // No interactions = pure background
```

### **Grid Appearance**

```jsx
lineThickness={0.8}      // Thinner = more subtle (default: 1)
linesColor="rgb(120, 50, 180)"  // Primary purple
gridScale={0.15}         // Larger cells = less density, better FPS
lineStyle="solid"        // Clean professional look
lineJitter={0.05}        // Minimal movement for subtle life
```

### **Scan Animation**

```jsx
scanColor="rgb(170, 120, 220)"  // Lighter purple for visibility
scanOpacity={0.25}       // Low opacity = subtle, not distracting
scanDirection="pingpong" // Smooth back-and-forth
scanDuration={4.0}       // Slower = more ambient (default: 2.0)
scanDelay={3.0}          // Longer pause between scans
```

### **Visual Effects**

```jsx
bloomIntensity={0.15}    // Subtle glow on bright areas
bloomThreshold={0.7}     // Only brightest parts glow
chromaticAberration={0.0008}  // Minimal color shift for depth
noiseIntensity={0.005}   // Very subtle film grain
```

---

## 📐 Layout Structure

The component uses a **4-layer approach**:

```
Layer 1 (-z-10): Main GridScan animation
Layer 2 (-z-10): Radial glow overlay (purple highlights)
Layer 3 (-z-10): Vignette (focus on center)
Layer 4 (-z-20): Mobile fallback gradient
```

All layers use:
- `fixed inset-0` - Full viewport coverage
- `pointer-events-none` - No interaction blocking
- Proper z-index hierarchy

---

## 🎯 Content Readability Tips

### **1. Use Proper Z-Index**
```jsx
<BackgroundGrid />  {/* z-index: -10 */}
<main className="relative z-10">  {/* Above background */}
  Your content here
</main>
```

### **2. Text Contrast**
```jsx
{/* High contrast for headings */}
<h1 className="text-white font-bold">Heading</h1>

{/* Medium contrast for body */}
<p className="text-gray-300">Body text</p>

{/* Purple accents */}
<span className="text-purple-400">Highlight</span>
```

### **3. Background Overlays (if needed)**
```jsx
<div className="bg-black/50 backdrop-blur-sm">
  {/* Content with extra readability */}
</div>
```

---

## 📱 Mobile Optimization

### **Automatic Fallback**
On mobile devices (`md:hidden`), the heavy GridScan is replaced with a lightweight gradient:

```jsx
<div className="fixed inset-0 w-screen h-screen -z-20 bg-black md:hidden">
  <div className="w-full h-full"
    style={{
      background: `radial-gradient(
        ellipse at center top, 
        rgba(120, 50, 180, 0.15) 0%, 
        rgba(75, 30, 120, 0.08) 40%, 
        rgba(0, 0, 0, 1) 100%
      )`
    }}
  />
</div>
```

**Why?**
- Mobile GPUs struggle with complex shaders
- Saves battery life
- Still maintains visual brand consistency
- Instant load, no lag

---

## 🔧 Customization Options

### **Adjust Grid Density**
```jsx
gridScale={0.2}   // Larger = fewer cells = better performance
gridScale={0.1}   // Smaller = more cells = more detailed
```

### **Change Scan Speed**
```jsx
scanDuration={6.0}  // Slower, more ambient
scanDuration={2.0}  // Faster, more dynamic
```

### **Adjust Overall Opacity**
```jsx
<GridScan 
  className="w-full h-full opacity-30"  // Less visible
  className="w-full h-full opacity-50"  // More visible
/>
```

### **Disable Bloom/Effects**
```jsx
enablePost={false}  // Disable all post-processing
bloomIntensity={0}  // Disable only bloom
```

---

## 🎨 Alternative Color Schemes

### **Blue Theme**
```jsx
linesColor="rgb(50, 120, 180)"
scanColor="rgb(120, 170, 220)"
// Update radial gradient colors accordingly
```

### **Green Theme**
```jsx
linesColor="rgb(50, 180, 120)"
scanColor="rgb(120, 220, 170)"
```

### **Monochrome**
```jsx
linesColor="rgb(100, 100, 100)"
scanColor="rgb(200, 200, 200)"
```

---

## ⚡ Performance Checklist

- ✅ `enableWebcam={false}` - Disabled
- ✅ `gridScale={0.15}` - Not too dense
- ✅ `scanDuration={4.0}` - Slow, smooth
- ✅ Overall opacity ≤ 0.4 - Not overwhelming
- ✅ Mobile fallback - Gradient instead of shader
- ✅ `pointer-events-none` - No interaction blocking
- ✅ Fixed positioning - No layout shifts

---

## 🐛 Troubleshooting

### **Grid not visible?**
- Check z-index: Background should be `-z-10`, content `z-10+`
- Increase opacity: Change `opacity-40` to `opacity-60`
- Check parent container: Must allow `fixed` positioning

### **Performance issues?**
- Increase `gridScale` to 0.2 or higher
- Disable bloom: `enablePost={false}`
- Use mobile fallback on all devices (remove `md:hidden`)

### **Content hard to read?**
- Reduce background opacity to `opacity-30`
- Add backdrop blur to content: `backdrop-blur-sm`
- Use higher contrast text colors

### **Grid too distracting?**
- Increase `scanDelay` to 5.0+
- Reduce `scanOpacity` to 0.15
- Slow down: `scanDuration={6.0}`

---

## 📊 Browser Support

- ✅ Chrome/Edge 90+ (WebGL 2.0)
- ✅ Firefox 88+
- ✅ Safari 15+ (macOS/iOS)
- ⚠️ Older browsers: Falls back to gradient

---

## 🎯 Best Practices

1. **Always use `pointer-events-none`** to avoid blocking interactions
2. **Keep content at `z-10` or higher** to appear above background
3. **Test on mid-range devices**, not just high-end
4. **Use mobile fallback** for better performance
5. **Don't stack multiple GridScans** - use one per page
6. **Monitor GPU usage** in DevTools Performance tab

---

## 📝 Example: Full Page Layout

```jsx
import BackgroundGrid from './components/BackgroundGrid';

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background - renders once for entire page */}
      <BackgroundGrid />

      {/* All content above background */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <h1 className="text-6xl font-bold">Your Name</h1>
        </section>

        {/* About */}
        <section className="min-h-screen px-6 py-20">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-gray-300">Content here...</p>
        </section>

        {/* Projects */}
        <section className="min-h-screen px-6 py-20">
          <h2 className="text-4xl font-bold mb-8">Projects</h2>
          {/* Project cards */}
        </section>
      </div>
    </div>
  );
}
```

---

## 🎉 Final Result

Your portfolio will have:

✅ **Premium, professional look** matching ReactBits quality  
✅ **Smooth, ambient animation** that doesn't distract  
✅ **Optimized performance** on mid-range laptops  
✅ **Mobile-friendly** with gradient fallback  
✅ **Readable content** with proper contrast  
✅ **Strict purple color palette** as specified  

---

## 📚 Additional Resources

- GridScan Props: See `gridscan.js` for all available options
- Tailwind Docs: https://tailwindcss.com/docs
- Three.js Performance: https://threejs.org/docs/#manual/introduction/Performance

---

**Created for professional portfolio use. Enjoy! 🚀**
