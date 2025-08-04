import { useState } from 'react';
import { useAuth } from './useAuth';
import { scriptTemplates } from '../data/scriptTemplates';
import { hooks } from '../data/hooks';
import { transitions } from '../data/transitions';
import { callsToAction } from '../data/callsToAction';

export const useScriptGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, getApiKeys, updateScriptCount } = useAuth();

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generateScript = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Check if user has reached script limit
      if (user && user.scriptsGenerated >= user.scriptsLimit) {
        throw new Error('You have reached your monthly script limit. Please upgrade your plan.');
      }

      // Get API keys
      const apiKeys = getApiKeys();
      if (!apiKeys || !apiKeys.openai) {
        throw new Error('OpenAI API key is required. Please update your settings.');
      }

      const { topic, platform, contentType, tone, customHook, customCTA } = formData;

      // Get template
      const templates = scriptTemplates[platform]?.[contentType];
      if (!templates || templates.length === 0) {
        throw new Error('No templates available for the selected platform and content type.');
      }

      const template = getRandomItem(templates);

      // Get hook
      const hook = customHook || getRandomItem(hooks[platform]).replace('[TOPIC]', topic);

      // Get transition
      const transition = getRandomItem(transitions[platform]);

      // Get CTA
      const cta = customCTA || getRandomItem(callsToAction[platform]).replace('[TOPIC]', topic);

      // Generate content based on the template and inputs
      let script = template
        .replace('[HOOK]', hook)
        .replace('[TRANSITION]', transition)
        .replace('[CTA]', cta);

      // Generate main content based on content type and tone
      const content = await generateContent(topic, contentType, tone, platform, apiKeys.openai);
      script = script.replace('[CONTENT]', content);

      // Replace any remaining [TOPIC] placeholders
      script = script.replace(/\[TOPIC\]/g, topic);

      // Update script count
      updateScriptCount();

      return script;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async (topic, contentType, tone, platform, apiKey) => {
    // For demo purposes, we'll generate content without actually calling OpenAI API
    // In a real implementation, you would make an API call to OpenAI here
    
    const contentExamples = {
      educational: [
        `Here are 3 key facts about ${topic}:\n\n1. First important point about ${topic}\n2. Second crucial detail\n3. Third game-changing insight`,
        `Let me break down ${topic} for you:\n\n• Main concept explained simply\n• Why this matters to you\n• How to apply this knowledge`,
        `The truth about ${topic}:\n\n✓ What most people get wrong\n✓ The correct approach\n✓ Why this makes a difference`
      ],
      entertaining: [
        `You know what's funny about ${topic}? \n\n*shares relatable experience*\n\nWe've all been there, right?`,
        `POV: When you're trying to understand ${topic}\n\n*describes humorous situation*\n\nIt's like... why is this so complicated?`,
        `Me trying to explain ${topic} to my friends:\n\n*acts out funny scenario*\n\nThey just don't get it! 😂`
      ],
      storytelling: [
        `Let me tell you about the time ${topic} changed everything for me...\n\n*shares personal story*\n\nThat's when I realized the power of ${topic}.`,
        `Picture this: It's 2 years ago, and I knew nothing about ${topic}...\n\n*tells transformation story*\n\nNow look where I am!`,
        `Here's a story about ${topic} that will inspire you...\n\n*shares motivational narrative*\n\nThe lesson? Never give up on ${topic}.`
      ],
      tutorial: [
        `Step 1: Start with the basics of ${topic}\nStep 2: Apply this technique\nStep 3: Watch the magic happen\n\nIt's that simple!`,
        `Here's exactly how to master ${topic}:\n\n→ First, do this\n→ Then, try this method\n→ Finally, implement this strategy`,
        `The complete ${topic} process:\n\n1️⃣ Preparation phase\n2️⃣ Execution phase\n3️⃣ Optimization phase`
      ],
      reaction: [
        `Okay, I just tried ${topic} and... WOW!\n\n*shares genuine reaction*\n\nI was NOT expecting this result!`,
        `My honest review of ${topic}:\n\n✅ What worked amazingly\n❌ What didn't work\n🤔 What surprised me`,
        `Testing ${topic} so you don't have to:\n\n*shares experience*\n\nHere's my verdict...`
      ],
      challenge: [
        `Day 1 of trying ${topic} challenge:\n\n*shows initial attempt*\n\nThis is harder than it looks!\n\nDay 7 update: Mind = blown! 🤯`,
        `I challenged myself to master ${topic} in one week...\n\n*shows progress*\n\nThe results will shock you!`,
        `Can you complete this ${topic} challenge?\n\n*explains the challenge*\n\nTag me if you try it!`
      ]
    };

    const examples = contentExamples[contentType] || contentExamples.educational;
    return getRandomItem(examples);
  };

  return {
    generateScript,
    loading,
    error
  };
};
