import { useState } from 'react';
import villagerData from './data/villagers.json'; 
import CustomCursor from './CustomCursor';
import './App.css';

const UNIVERSAL_GIFTS = {
  loves: ["Prismatic Shard", "Rabbit's Foot", "Pearl", "Golden Pumpkin", "Magic Rock Candy"],
  likes: ["All Artisan Goods", "All Cooking", "All Flowers", "All Gems", "Maple Syrup"],
  dislikes: ["Clay", "Trash", "Sap", "Carp", "Seaweed", "Green Algae", "White Algae", "Hay", "Poppy", "Totems"]
};

function App() {
  const [villagers] = useState(villagerData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVillager, setSelectedVillager] = useState(null);
  const [showUniversals, setShowUniversals] = useState(false);

  const filteredVillagers = villagers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImage = (name) => {
    const formattedName = name.replace(/ /g, "_"); 
    return `https://stardewvalleywiki.com/Special:FilePath/${formattedName}.png`;
  };

  return (
    <div className="app-container">
      <CustomCursor />
      <h1>Pelican Town Tracker</h1>
      
      {/* Header Controls: Search + Universal Button */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', height: '50px' }}>
        <input 
          type="text" 
          placeholder="Search villager..." 
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowUniversals(false); 
          }}
          className="search-bar"
          style={{ flex: 1, height: '100%', fontSize: '1.5rem' }}
        />
        <button 
          onClick={() => setShowUniversals(!showUniversals)}
          style={{
            fontFamily: 'inherit',
            fontSize: '1.2rem',
            backgroundColor: showUniversals ? '#ffcea0' : '#855e42',
            color: showUniversals ? '#5c3509' : '#fff',
            border: '3px solid #5c3509',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0 20px'
          }}
        >
          {showUniversals ? "Show Villagers" : "★ Universals"}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column: Scrollable List */}
        <div style={{ flex: 1, overflowY: 'auto', borderRight: '1px solid #ddd', paddingRight: '10px' }}>
          {filteredVillagers.map(villager => (
            <div 
              key={villager.id} 
              onClick={() => {
                setSelectedVillager(villager);
                setShowUniversals(false); // Switch back to villager mode
              }}
              className="villager-list-item"
              style={{ background: (!showUniversals && selectedVillager?.id === villager.id) ? '#e0f7fa' : 'transparent' }}
            >
              <img 
                src={getImage(villager.name)} 
                alt={villager.name} 
                className="pixel-art-icon" 
              />
              <span>{villager.name}</span>
            </div>
          ))}
        </div>

        {/* Right Column: CONDITIONAL RENDERING */}
        <div style={{ flex: 2, padding: '20px', overflowY: 'auto' }}>
          
          {/* OPTION 1: SHOW UNIVERSAL GUIDE */}
          {showUniversals ? (
            <div className="villager-card" style={{ backgroundColor: '#fff8e1' }}>
              <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', color: '#d32f2f' }}>
                ★ Universal Gifts
              </h2>
              <p><i>Most villagers feel the same about these items (with a few exceptions!).</i></p>

              <h3>💖 Universal Loves</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {UNIVERSAL_GIFTS.loves.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#ffcdd2', padding: '5px 10px', borderRadius: '15px', border: '1px solid #e57373' }}>
                    <img src={getImage(item)} alt={item} style={{ width: '24px', height: '24px' }} />
                    {item}
                  </div>
                ))}
              </div>

              <h3>👍 Universal Likes</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                {UNIVERSAL_GIFTS.likes.map(item => (
                  <span key={item} className="tag" style={{ backgroundColor: '#fff9c4', border: '1px solid #fbc02d' }}>
                    {item}
                  </span>
                ))}
              </div>

              <h3>❌ Universal Hates/Dislikes</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {UNIVERSAL_GIFTS.dislikes.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#cfd8dc', padding: '5px 10px', borderRadius: '15px', border: '1px solid #90a4ae' }}>
                    <img src={getImage(item)} alt={item} style={{ width: '24px', height: '24px' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          /* OPTION 2: SHOW SELECTED VILLAGER */
          ) : selectedVillager ? (
<div className="villager-card">
              <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                {selectedVillager.name}
              </h2>
              <p><i>{selectedVillager.description}</i></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                  <h3>🎂 Birthday</h3>
                  <p>{selectedVillager.birthday}</p>
                </div>
                <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                  <h3>🏠 Address</h3>
                  <p>{selectedVillager.address}</p>
                </div>
              </div>

              <div className="schedule-box">
                <h3 style={{ marginTop: 0 }}>📍 Schedule</h3>
                <p><strong>☀️ Regular Day:</strong><br/> {selectedVillager.schedule.default}</p>
                {selectedVillager.schedule.rain && (
                  <p><strong>🌧️ Raining:</strong><br/> {selectedVillager.schedule.rain}</p>
                )}
                {selectedVillager.schedule.tuesday && (
                  <p><strong>📅 Tuesday:</strong><br/> {selectedVillager.schedule.tuesday}</p>
                )}
              </div>

              {/* --- LOVES SECTION (Pink) --- */}
              {/* Note: Ensure your JSON uses the key "loves" for these items! */}
              {selectedVillager.loves && (
                <>
                  <h3>💖 Loves</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                    {selectedVillager.loves.map(item => (
                      <span key={item} className="tag like">
                        <img src={getImage(item)} alt="" onError={(e) => e.target.style.display = 'none'} />
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* --- LIKES SECTION (Yellow) --- */}
              {selectedVillager.likes && (
                <>
                  <h3>👍 Likes</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                    {selectedVillager.likes.map(item => (
                      <span key={item} className="tag good"> {/* New CSS Class */}
                        <img src={getImage(item)} alt="" onError={(e) => e.target.style.display = 'none'} />
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* --- DISLIKES SECTION (Grey) --- */}
              {selectedVillager.dislikes && selectedVillager.dislikes[0] !== "None" && (
                <>
                  <h3>❌ Dislikes</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {selectedVillager.dislikes.map(item => (
                      <span key={item} className="tag dislike">
                        <img src={getImage(item)} alt="" onError={(e) => e.target.style.display = 'none'} />
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
              <h3>Select a villager or click "Universals"!</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;