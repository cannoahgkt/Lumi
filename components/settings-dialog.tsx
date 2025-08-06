"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Key, Sliders, Trash2, Eye, EyeOff } from "lucide-react"
import type { UserSettings } from "@/types"
import { AI_PROVIDERS } from "@/lib/providers"

interface SettingsDialogProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
  onClearChat: () => void
}

export function SettingsDialog({ settings, onSettingsChange, onClearChat }: SettingsDialogProps) {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})
  const [tempApiKeys, setTempApiKeys] = useState<Record<string, string>>(settings.apiKeys)

  const handleSaveApiKeys = () => {
    onSettingsChange({
      ...settings,
      apiKeys: tempApiKeys,
    })
  }

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider],
    }))
  }

  const userKeyProviders = AI_PROVIDERS.filter(p => p.apiKeyRequired)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="liquid-glass-button">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="liquid-glass-card max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your LUMI AI experience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api-keys" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Your API Keys</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Add your own API keys to use additional models. Keys are stored locally in your browser.
                </p>
              </div>

              {userKeyProviders.map((provider) => (
                <div key={provider.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${provider.id}-key`} className="flex items-center gap-2">
                      <Key className="h-3 w-3" />
                      {provider.name}
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      {provider.models.length} models
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`${provider.id}-key`}
                        type={showApiKeys[provider.id] ? "text" : "password"}
                        placeholder="Enter your API key..."
                        value={tempApiKeys[provider.id] || ""}
                        onChange={(e) => setTempApiKeys(prev => ({
                          ...prev,
                          [provider.id]: e.target.value,
                        }))}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                        onClick={() => toggleApiKeyVisibility(provider.id)}
                      >
                        {showApiKeys[provider.id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Available models: {provider.models.map(m => m.name).join(", ")}
                  </div>
                </div>
              ))}

              <Button onClick={handleSaveApiKeys} className="w-full">
                Save API Keys
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Model Parameters</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Adjust how the AI responds to your messages
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.preferences.temperature}
                    </span>
                  </div>
                  <Slider
                    value={[settings.preferences.temperature]}
                    onValueChange={([value]) => onSettingsChange({
                      ...settings,
                      preferences: { ...settings.preferences, temperature: value }
                    })}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower = more focused, Higher = more creative
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Tokens</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.preferences.maxTokens}
                    </span>
                  </div>
                  <Slider
                    value={[settings.preferences.maxTokens]}
                    onValueChange={([value]) => onSettingsChange({
                      ...settings,
                      preferences: { ...settings.preferences, maxTokens: value }
                    })}
                    max={4000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum length of AI responses
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save conversations</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically save chat history locally
                    </p>
                  </div>
                  <Switch
                    checked={settings.preferences.autoSave}
                    onCheckedChange={(checked) => onSettingsChange({
                      ...settings,
                      preferences: { ...settings.preferences, autoSave: checked }
                    })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Data Management</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Manage your local data and chat history
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="destructive"
                  onClick={onClearChat}
                  className="w-full flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Chat History
                </Button>
                <p className="text-xs text-muted-foreground">
                  This will permanently delete all your chat messages.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                  className="w-full flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Reset All Data
                </Button>
                <p className="text-xs text-muted-foreground">
                  This will clear all settings, API keys, and chat history.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
