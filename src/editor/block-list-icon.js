/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'

/**
 * Internal dependencies
 */
import { responsiveIcon } from './../data/icons'


/**
 * Adds an icon to a specific block in the block editor list view.
 * The icon indicates that the block has a non-default entrance animation.
 *
 * @param {Object} block - The block object from the block editor.
 */
function addIconToBlock(block) {
    // Find the DOM element corresponding to the block in the list view
    const blockNode = document.querySelector(`.block-editor-list-view-leaf[data-block="${block.clientId}"]`);

    if (blockNode) {
        // Remove any existing icons to avoid duplicates
        const existingIcon = blockNode.querySelector('.wop-responsive-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        // Check if the block needs responsive icon
		const { attributes } = block
		if (
			! attributes.wopVisibility.desktop ||
			! attributes.wopVisibility.tablet ||
			! attributes.wopVisibility.mobile ||
			( attributes.wopStack.enabled && attributes.wopStack.tablet || attributes.wopStack.mobile ) ||
			( attributes.wopReverse.enabled && attributes.wopReverse.tablet || attributes.wopReverse.mobile ) ||
			( attributes.wopOrder.enabled && attributes.wopOrder.tablet != 0 || attributes.wopOrder.tablet != 0 )
		) {
            // If no icon exists, add a new icon next to the block title
            if (!blockNode.querySelector('.wop-responsive-icon')) {
                blockNode
                    .querySelector('.block-editor-list-view-block-select-button__title')
                    .insertAdjacentHTML('afterend', responsiveIcon);
            }
        }
    }
}

/**
 * Updates the block editor list view by adding icons to blocks with entrance animations.
 * This function processes all blocks and their inner blocks recursively.
 */
function updateListView() {
    // Retrieve all blocks in the editor
    const blocks = wp.data.select('core/block-editor').getBlocks();

    /**
     * Processes a list of blocks, adding icons where applicable and handling inner blocks recursively.
     *
     * @param {Array} blockList - The list of blocks to process.
     */
    function processBlocks(blockList) {
        blockList.forEach((block) => {
            addIconToBlock(block);

            // Recursively process inner blocks
            if (block.innerBlocks && block.innerBlocks.length > 0) {
                processBlocks(block.innerBlocks);
            }
        });
    }

    // Process all blocks including inner blocks
    processBlocks(blocks);
}

/**
 * Initializes the responsive block icon functionality.
 */
function init() {
    // Initial update of the list view
    updateListView();

    // Subscribe to changes in the block editor and update the list view accordingly
    wp.data.subscribe(() => {
        updateListView();
    });
}

export { init };


