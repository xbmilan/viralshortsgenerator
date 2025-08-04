import React, { useState } from 'react';
import { useScriptGenerator } from '../../hooks/useScriptGenerator';
import { CONTENT_TYPES, PLATFORMS, TONES } from '../../config/constants';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const ScriptGenerator = () => {
  const { generateScript, loading, error } = useScriptGenerator();
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'tiktok',
    contentType: 'educational',
    tone: 'engaging',
    customHook: '',
    customCTA: ''
  });
  const [generatedScript, setGeneratedScript] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const script = await generateScript(formData);
      setGeneratedScript(script);
    } catch (err) {
      console.error('Script generation failed:', err);
    }
  };

  const platformOptions = Object.entries(PLATFORMS).map(([key, value]) => ({
    value: key,
    label: value.name
  }));

  const contentTypeOptions = Object.entries(CONTENT_TYPES).map(([key, value]) => ({
    value: key,
    label: value.name
  }));

  const toneOptions = Object.entries(TONES).map(([key, value]) => ({
    value: key,
    label: value.name
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-light-white">
          Generate Your Script
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Topic/Subject"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g., How to make money online, Fitness tips, Cooking hacks"
            required
            disabled={loading}
          />
          
          <Select
            label="Platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            options={platformOptions}
            disabled={loading}
          />
          
          <Select
            label="Content Type"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            options={contentTypeOptions}
            disabled={loading}
          />
          
          <Select
            label="Tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            options={toneOptions}
            disabled={loading}
          />
          
          <Input
            label="Custom Hook (Optional)"
            name="customHook"
            value={formData.customHook}
            onChange={handleChange}
            placeholder="e.g., Did you know that..."
            disabled={loading}
          />
          
          <Input
            label="Custom Call-to-Action (Optional)"
            name="customCTA"
            value={formData.customCTA}
            onChange={handleChange}
            placeholder="e.g., Follow for more tips!"
            disabled={loading}
          />
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={loading || !formData.topic.trim()}
          >
            {loading ? 'Generating Script...' : 'Generate Script'}
          </Button>
        </form>
      </Card>
      
      {/* Generated Script */}
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-light-white">
          Generated Script
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : generatedScript ? (
          <div className="space-y-4">
            <div className="bg-dark-navy3 rounded-lg p-4">
              <pre className="text-light-gray whitespace-pre-wrap font-sans">
                {generatedScript}
              </pre>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(generatedScript)}
              >
                Copy Script
              </Button>
              <Button
                variant="ghost"
                onClick={() => setGeneratedScript('')}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-light-gray">
            <p>Your generated script will appear here</p>
            <p className="text-sm mt-2">Fill out the form and click "Generate Script" to get started</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScriptGenerator;
