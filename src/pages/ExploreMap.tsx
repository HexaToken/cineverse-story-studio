import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  Play,
  MessageCircle,
  Repeat2,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid3x3,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import * as THREE from "three";

interface UniverseNode {
  id: number;
  title: string;
  position: [number, number, number];
  color: string;
  genre: string;
  creator: string;
  views: string;
  rating: number;
}

const universeNodes: UniverseNode[] = [
  // Sci-Fi Galaxy
  { id: 1, title: "Neural Dawn", position: [2, 1, 0], color: "#00eaff", genre: "Sci-Fi", creator: "AetherMind", views: "1.2M", rating: 4.9 },
  { id: 2, title: "Zero Orbit", position: [1.5, 0.5, 1], color: "#00eaff", genre: "Sci-Fi", creator: "DreamWeaver", views: "890K", rating: 4.8 },
  { id: 3, title: "Digital Genesis", position: [2.5, 0.8, -0.5], color: "#00eaff", genre: "Sci-Fi", creator: "VoidPoet", views: "750K", rating: 4.7 },
  
  // Romance Galaxy
  { id: 4, title: "Quantum Hearts", position: [-2, 0.5, 1], color: "#ff6b9d", genre: "Romance", creator: "VoidPoet", views: "2.1M", rating: 5.0 },
  { id: 5, title: "Fractal Hearts", position: [-1.5, 1, 0], color: "#ff6b9d", genre: "Romance", creator: "PixelPoet", views: "980K", rating: 4.9 },
  { id: 6, title: "Love Algorithm", position: [-2.3, 0.2, -1], color: "#ff6b9d", genre: "Romance", creator: "DreamWeaver", views: "1.5M", rating: 4.8 },
  
  // Mystery Galaxy
  { id: 7, title: "Silent Code", position: [0, -2, 1], color: "#a24df6", genre: "Mystery", creator: "CodeSage", views: "540K", rating: 4.8 },
  { id: 8, title: "Echo City", position: [0.5, -1.5, 0], color: "#a24df6", genre: "Mystery", creator: "DreamWeaver", views: "890K", rating: 4.9 },
  { id: 9, title: "The Cipher", position: [-0.5, -1.8, -1], color: "#a24df6", genre: "Mystery", creator: "CodeSage", views: "620K", rating: 4.7 },
  
  // Fantasy Galaxy
  { id: 10, title: "Celestial Dreams", position: [0, 2, -1], color: "#ffd700", genre: "Fantasy", creator: "StarForge", views: "950K", rating: 4.9 },
  { id: 11, title: "Mythic Realms", position: [0.8, 1.8, 0], color: "#ffd700", genre: "Fantasy", creator: "DreamWeaver", views: "1.1M", rating: 4.8 },
  { id: 12, title: "Dragon's Dawn", position: [-0.7, 2.2, 1], color: "#ffd700", genre: "Fantasy", creator: "StarForge", views: "780K", rating: 4.7 },
];

const UniverseSphere = ({ node, onClick, isHovered, onHover }: { 
  node: UniverseNode; 
  onClick: () => void; 
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 1.5 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {isHovered && (
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {node.title}
        </Text>
      )}
    </group>
  );
};

const ExploreMap = () => {
  const [selectedNode, setSelectedNode] = useState<UniverseNode | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [aiMode, setAiMode] = useState(false);
  const [mapView, setMapView] = useState<"universe" | "creator" | "genre">("universe");

  const handleNodeClick = (node: UniverseNode) => {
    setSelectedNode(node);
  };

  const genreStats = {
    "Sci-Fi": { count: "5.4K", mood: "Tech-forward, Contemplative" },
    "Romance": { count: "3.2K", mood: "Emotional, Hopeful" },
    "Mystery": { count: "2.8K", mood: "Suspenseful, Dark" },
    "Fantasy": { count: "4.1K", mood: "Magical, Epic" },
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-[800px] h-[800px] bg-[#00eaff] rounded-full blur-[200px] -top-40 -left-40 animate-pulse" />
          <div className="absolute w-[800px] h-[800px] bg-[#a24df6] rounded-full blur-[200px] -bottom-40 -right-40 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
          <h1 className="font-display text-7xl font-bold text-white drop-shadow-[0_0_40px_rgba(0,234,255,0.5)]">
            Welcome to the CineVerse Multiverse
          </h1>
          <p className="text-2xl text-white/70">
            Explore the interconnected galaxies of stories, creators, and imagination.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap pt-8">
            <Button
              onClick={() => setShowIntro(false)}
              className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-10 py-7 shadow-[0_0_40px_rgba(0,234,255,0.5)]"
            >
              🚀 Enter Map
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#00eaff]/40 text-[#00eaff] text-lg px-10 py-7"
            >
              <Link to="/discover">
                🎥 Featured Universes
              </Link>
            </Button>
            <Button
              onClick={() => {
                setShowIntro(false);
                setAiMode(true);
              }}
              variant="outline"
              className="border-[#a24df6]/40 text-[#a24df6] text-lg px-10 py-7"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              AI Guide Me
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="absolute inset-0"
      >
        <color attach="background" args={["#0a0b1a"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a24df6" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {universeNodes.map((node) => (
          <UniverseSphere
            key={node.id}
            node={node}
            onClick={() => handleNodeClick(node)}
            isHovered={hoveredId === node.id}
            onHover={(hovered) => setHoveredId(hovered ? node.id : null)}
          />
        ))}
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={aiMode}
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold">
              <span className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                CINEVERSE
              </span>
            </h1>
            <Badge className="bg-white/10 text-white/70 border-white/20">
              Map Mode
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search universes, creators, or tags..."
                className="pl-10 w-80 bg-white/5 backdrop-blur-xl border-white/10 text-white"
              />
            </div>

            <div className="flex gap-2 bg-white/5 backdrop-blur-xl rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setMapView("universe")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mapView === "universe"
                    ? "bg-[#00eaff]/20 text-[#00eaff]"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                Universe View
              </button>
              <button
                onClick={() => setMapView("creator")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mapView === "creator"
                    ? "bg-[#a24df6]/20 text-[#a24df6]"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                Creator View
              </button>
              <button
                onClick={() => setMapView("genre")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mapView === "genre"
                    ? "bg-[#00eaff]/20 text-[#00eaff]"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                Genre View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {selectedNode && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-96">
          <Card className="bg-[#0a0b1a]/95 backdrop-blur-xl border-[#00eaff]/30">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {selectedNode.title}
                  </h3>
                  <p className="text-white/60">by @{selectedNode.creator}</p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center border border-white/10">
                <Play className="w-12 h-12 text-white/50" />
              </div>

              <div className="flex gap-2">
                <Badge className="bg-[#00eaff]/10 text-[#00eaff] border-[#00eaff]/30">
                  {selectedNode.genre}
                </Badge>
                <Badge className="bg-white/5 text-white/70">
                  ⭐ {selectedNode.rating}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedNode.views}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Watch
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discuss
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  <Repeat2 className="w-4 h-4 mr-2" />
                  Remix
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2 bg-white/5 backdrop-blur-xl rounded-lg p-2 border border-white/10">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <ZoomOut className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Grid3x3 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* AI Assistant Button */}
      <div className="absolute bottom-6 right-6 z-10">
        <Button
          onClick={() => setAiMode(!aiMode)}
          className={`rounded-full w-16 h-16 shadow-[0_0_30px_rgba(162,77,246,0.5)] ${
            aiMode
              ? "bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Floating Social Layer */}
      <div className="absolute left-6 bottom-6 z-10 space-y-3">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <TrendingUp className="w-4 h-4 text-[#00eaff]" />
            <span className="font-semibold">Trending Nearby</span>
          </div>
          <div className="space-y-2">
            {["Neural Dawn", "Quantum Hearts", "Echo City"].map((title, i) => (
              <div key={i} className="text-white/60 text-xs hover:text-white cursor-pointer">
                {title}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <Users className="w-4 h-4 text-[#a24df6]" />
            <span className="font-semibold">Creator Clusters</span>
          </div>
          <div className="space-y-2">
            {["AetherMind", "DreamWeaver", "VoidPoet"].map((name, i) => (
              <div key={i} className="text-white/60 text-xs hover:text-white cursor-pointer">
                @{name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Genre Info (when hovering genre cluster) */}
      {mapView === "genre" && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-80">
          <Card className="bg-[#0a0b1a]/95 backdrop-blur-xl border-[#a24df6]/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display text-xl font-bold text-white">Genre Clusters</h3>
              {Object.entries(genreStats).map(([genre, stats]) => (
                <div key={genre} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">{genre}</span>
                    <Badge className="bg-white/10 text-white/70">
                      {stats.count}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-sm">{stats.mood}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Mode Indicator */}
      {aiMode && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
          <Card className="bg-[#0a0b1a]/95 backdrop-blur-xl border-[#a24df6]/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#a24df6] animate-pulse" />
                <div>
                  <p className="text-white font-semibold">AI Navigation Active</p>
                  <p className="text-white/60 text-sm">Exploring worlds that match your imagination...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0a0b1a] to-transparent pt-20 pb-6">
        <div className="text-center space-y-4 px-6">
          <p className="text-white/60">
            In the CineVerse, every story is a star — and you're the next one.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white"
            >
              <Link to="/create">
                🪐 Start Your Universe
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white"
            >
              <Link to="/discover">
                🎞 Return to Discover Feed
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMap;
