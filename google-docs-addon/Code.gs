/**
 * Marvelab Google Docs Add-on
 * This script handles the server-side logic for the Marvelab add-on.
 */

// Configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your actual API URL in production
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 */
function onOpen() {
  DocumentApp.getUi()
      .createAddonMenu()
      .addItem('Open Marvelab', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 */
function onInstall() {
  onOpen();
}

/**
 * Runs when the add-on is opened from the homepage.
 */
function onHomepage() {
  showSidebar();
}

/**
 * Opens the sidebar in the document.
 */
function showSidebar() {
  const ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Marvelab')
      .setWidth(300);
  DocumentApp.getUi().showSidebar(ui);
}

/**
 * Fetches all notes from the Marvelab API.
 * @return {Object} The notes data.
 */
function getNotes() {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/notes`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log('Error fetching notes: ' + error);
    return { error: 'Failed to fetch notes. Please check your connection.' };
  }
}

/**
 * Fetches all interpretations from the Marvelab API.
 * @return {Object} The interpretations data.
 */
function getInterpretations() {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/interpretations`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log('Error fetching interpretations: ' + error);
    return { error: 'Failed to fetch interpretations. Please check your connection.' };
  }
}

/**
 * Fetches all resources from the Marvelab API.
 * @return {Object} The resources data.
 */
function getResources() {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/resources`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log('Error fetching resources: ' + error);
    return { error: 'Failed to fetch resources. Please check your connection.' };
  }
}

/**
 * Fetches all methodologies from the Marvelab API.
 * @return {Object} The methodologies data.
 */
function getMethodologies() {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/methodologies`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log('Error fetching methodologies: ' + error);
    return { error: 'Failed to fetch methodologies. Please check your connection.' };
  }
}

/**
 * Fetches all experiments from the Marvelab API.
 * @return {Object} The experiments data.
 */
function getExperiments() {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/experiments`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log('Error fetching experiments: ' + error);
    return { error: 'Failed to fetch experiments. Please check your connection.' };
  }
}

/**
 * Fetches a specific item by ID and type from the Marvelab API.
 * @param {string} type - The type of item (notes, interpretations, resources, etc.)
 * @param {number} id - The ID of the item to fetch.
 * @return {Object} The requested item.
 */
function getItemById(type, id) {
  try {
    const response = UrlFetchApp.fetch(`${API_BASE_URL}/${type}/${id}`);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log(`Error fetching ${type} with ID ${id}: ${error}`);
    return { error: `Failed to fetch ${type}. Please check your connection.` };
  }
}

/**
 * Inserts text content into the document at the current cursor position.
 * @param {string} content - The text content to insert.
 * @return {Object} Status of the operation.
 */
function insertTextContent(content) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();
    
    if (!cursor) {
      // If no cursor, append to the body
      const body = doc.getBody();
      body.appendParagraph(content);
    } else {
      // Insert at cursor position
      const element = cursor.getElement();
      const offset = cursor.getOffset();
      
      if (element.editAsText) {
        const text = element.editAsText();
        text.insertText(offset, content);
      } else {
        // If cursor is not in a text element, append to body
        const body = doc.getBody();
        body.appendParagraph(content);
      }
    }
    
    return { success: true, message: 'Content inserted successfully.' };
  } catch (error) {
    Logger.log('Error inserting content: ' + error);
    return { success: false, error: 'Failed to insert content: ' + error };
  }
}

/**
 * Inserts an image into the document at the current cursor position.
 * @param {string} imageUrl - The URL of the image to insert.
 * @param {string} altText - Alternative text for the image.
 * @return {Object} Status of the operation.
 */
function insertImage(imageUrl, altText) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const blob = UrlFetchApp.fetch(imageUrl).getBlob();
    
    const cursor = doc.getCursor();
    if (!cursor) {
      // If no cursor, append to the body
      const body = doc.getBody();
      const image = body.appendImage(blob);
      if (altText) {
        image.setAltTitle(altText);
        image.setAltDescription(altText);
      }
    } else {
      // Insert at cursor position if possible, otherwise append to body
      const body = doc.getBody();
      const cursorPosition = cursor.getElement().getParent().getChildIndex(cursor.getElement());
      const image = body.insertImage(cursorPosition + 1, blob);
      if (altText) {
        image.setAltTitle(altText);
        image.setAltDescription(altText);
      }
    }
    
    return { success: true, message: 'Image inserted successfully.' };
  } catch (error) {
    Logger.log('Error inserting image: ' + error);
    return { success: false, error: 'Failed to insert image: ' + error };
  }
}

/**
 * Generates text using the Gemini API based on provided content.
 * @param {string} prompt - The prompt for text generation.
 * @return {Object} The generated text.
 */
function generateTextWithGemini(prompt) {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: {
        'x-goog-api-key': GEMINI_API_KEY
      }
    };
    
    const response = UrlFetchApp.fetch(`${GEMINI_API_URL}`, options);
    const responseData = JSON.parse(response.getContentText());
    
    if (responseData.candidates && responseData.candidates.length > 0 && 
        responseData.candidates[0].content && responseData.candidates[0].content.parts) {
      return { 
        success: true, 
        text: responseData.candidates[0].content.parts[0].text 
      };
    } else {
      return { 
        success: false, 
        error: 'No text was generated. Please try a different prompt.' 
      };
    }
  } catch (error) {
    Logger.log('Error generating text: ' + error);
    return { 
      success: false, 
      error: 'Failed to generate text: ' + error 
    };
  }
}

/**
 * Generates text based on specific notes, interpretations, or other content.
 * @param {Object} data - The data to use for generation, including prompt and selected items.
 * @return {Object} The generated text.
 */
function generateTextFromItems(data) {
  try {
    let contextText = '';
    
    // Add selected notes to context
    if (data.notes && data.notes.length > 0) {
      contextText += "Notes:\n";
      data.notes.forEach(noteId => {
        const note = getItemById('notes', noteId);
        if (!note.error) {
          contextText += `- ${note.content}\n`;
        }
      });
      contextText += "\n";
    }
    
    // Add selected interpretations to context
    if (data.interpretations && data.interpretations.length > 0) {
      contextText += "Interpretations:\n";
      data.interpretations.forEach(interpId => {
        const interp = getItemById('interpretations', interpId);
        if (!interp.error) {
          contextText += `- ${interp.content}\n`;
        }
      });
      contextText += "\n";
    }
    
    // Add selected methodologies to context
    if (data.methodologies && data.methodologies.length > 0) {
      contextText += "Methodologies:\n";
      data.methodologies.forEach(methId => {
        const meth = getItemById('methodologies', methId);
        if (!meth.error) {
          contextText += `- ${meth.title}: ${meth.description}\n`;
        }
      });
      contextText += "\n";
    }
    
    // Add selected experiments to context
    if (data.experiments && data.experiments.length > 0) {
      contextText += "Experiments:\n";
      data.experiments.forEach(expId => {
        const exp = getItemById('experiments', expId);
        if (!exp.error) {
          contextText += `- ${exp.title}: ${exp.description}\n`;
        }
      });
      contextText += "\n";
    }
    
    // Combine context with user prompt
    const fullPrompt = `${data.prompt}\n\nVoici les données sur lesquelles baser ta réponse:\n${contextText}`;
    
    return generateTextWithGemini(fullPrompt);
  } catch (error) {
    Logger.log('Error generating text from items: ' + error);
    return { 
      success: false, 
      error: 'Failed to generate text: ' + error 
    };
  }
}