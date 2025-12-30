import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tool, ToolCategory } from '@/types';

// Sample tools data - you can replace with your actual tools
const initialTools: Tool[] = [
  {
    id: 'tool-1',
    name: 'Calculator',
    description: 'Perform basic and advanced calculations',
    icon: 'calculator',
    category: 'utilities',
    isEnabled: true,
  },
  {
    id: 'tool-2',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: 'swap-horizontal',
    category: 'conversion',
    isEnabled: true,
  },
  {
    id: 'tool-3',
    name: 'QR Generator',
    description: 'Generate QR codes from text or URLs',
    icon: 'qr-code',
    category: 'generator',
    isEnabled: true,
  },
  {
    id: 'tool-4',
    name: 'Notes',
    description: 'Quick notes and reminders',
    icon: 'document-text',
    category: 'productivity',
    isEnabled: true,
  },
];

interface ToolsStore {
  tools: Tool[];
  selectedTool: Tool | null;
  searchQuery: string;
  selectedCategory: ToolCategory | 'all';
  
  // Actions
  setTools: (tools: Tool[]) => void;
  setSelectedTool: (tool: Tool | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ToolCategory | 'all') => void;
  toggleToolEnabled: (toolId: string) => void;
  getToolById: (toolId: string) => Tool | undefined;
  getFilteredTools: () => Tool[];
}

export const useToolsStore = create<ToolsStore>()(
  persist(
    (set, get) => ({
      tools: initialTools,
      selectedTool: null,
      searchQuery: '',
      selectedCategory: 'all',

      setTools: (tools) => set({ tools }),
      setSelectedTool: (tool) => set({ selectedTool: tool }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      toggleToolEnabled: (toolId) => {
        const { tools } = get();
        const updatedTools = tools.map((tool) =>
          tool.id === toolId ? { ...tool, isEnabled: !tool.isEnabled } : tool
        );
        set({ tools: updatedTools });
      },

      getToolById: (toolId) => {
        const { tools } = get();
        return tools.find((tool) => tool.id === toolId);
      },

      getFilteredTools: () => {
        const { tools, searchQuery, selectedCategory } = get();
        return tools.filter((tool) => {
          const matchesSearch = tool.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesCategory =
            selectedCategory === 'all' || tool.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
      },
    }),
    {
      name: 'tools-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tools: state.tools }),
    }
  )
);
