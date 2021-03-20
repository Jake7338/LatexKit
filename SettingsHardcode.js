function getGASettings(){
  return {
    devMode: true,
    GA_TID: 'UA-192641531-1',  // victor.negirneac@gmail.com account
    GA_UIP_DEV: '192.0.2.77',
    GA_UIP: '192.0.2.99',
    // Just a default User Agent to make hits count and be visible when
    // the box "Exclude all hits from known bots and spiders" is enabled
    // Would be great to use a personalized one but Google keeps track
    // valid ones, would break is using for instance the Add-on version
    GA_DEFAULT_UA: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15',
  }
}


var getDevSettings = function(){
  return {
    getAppName:           function(){return 'LatexKit'},
    getAppVersion:        function(){return 'v1.2.0'},
    getSettingsSheetName: function(){return 'LatexKitSettings'},
    getErrorColumnTag:    function(){return 'err'},
    getDataColSeparators: function(){return {space:' ',tab:'\t',enter:'\r\n',LF:'\n',CR:'\r'}},
    getFeedbackFormLink:  function(){return 'https://goo.gl/forms/WbqcEpMbYx3VGA2b2'},
    getFacebookLink:      function(){return 'https://www.facebook.com/latexkit/'},
    getGitHubLink:        function(){return 'https://github.com/caenrigen/LatexKit'},
    getMailLink:          function(){return 'mailto:latexkit.dev@gmail.com'},
    getHomepageLink:      function(){return 'http://caenrigen.tech/LatexKit/'},
    getMenuLabels:        function(){return {'singleTable': 'Make Table',
                                             'allTables':    'Export All Tables',
                                             'showSettings':  'Show Settings',
                                             'updateSettings':'Update Settings',
                                             'singleData':     'Export Data',
                                             'allData':       'Export All Data',
                                             'feedbackForm': 'Send Feedback, pleeeese!',
                                             'donateFunny': 'Keep Us Awake',
                                             'donate': 'Donate'}}
  };
};

var getDefaultSettings = function(){
  return {
    getGeneralDefaults : function(){return [
      ['LatexKit',getDevSettings().getAppVersion(),'Created By: Victor Negîrneac & Daniel Hachmeister'],
      ['Table Named Ranges Identifier:','.tab','For latest updates, feature requests and feedback please visit:'],
      ['Data Named Ranges Identifier:','.dat','facebook.com/latexkit/'],
      ['Use Settings Sheet for Single Export:',true, 'http://caenrigen.tech/LatexKit/']
    ];},
    getTabsHeader : function(){return [
    ['TABS'],
      ['Range Name:','Folder:','Extension:','Template:','Option:','Bigstrut:','Escape characters:','Table Type','Caption', 'Placement Specifier']
    ];},
    // Note that this default is not an array of arrays
    // This makes it more convenient for most calls
    getTabDefault : function(){return ['default','./tabs','.tex',false,false,false,'','tabular','default', '[]'];},
    getDataHeader : function(){return[
    ['DATA'],
      ['Range Name:','Folder:','Extension:','Full Precision:','Separator:','Column Swap:']
    ];},
    // Note that this default is not an array of arrays
    // This makes it more convenient for most calls
    getDatumDefault : function(){return ['default','./data','.txt',true,'tab',false];}
  };
};

// Constructors for getting settings from an array
// Every constructor returns an object containing the functions that return a specific element from the array
var getGeneralSettingsFromArray = function (genSettings){
  return {
    getVersion:        function(){return genSettings[0][1];},
    getTabsIdentifier: function(){return genSettings[1][1];},
    getDataIdentifier: function(){return genSettings[2][1];},
    getUseSettingForSingleExport: function(){return genSettings[3][1];}
  }
};
var getTabSettingsFromArray = function (tabSettings){
  return {
    getRangeName:          function(){return tabSettings[0];},
    getTemplate:           function(){return tabSettings[3];},
    getOptions:            function(){return tabSettings[4];},
    getBigstrut:           function(){return tabSettings[5];},
    getEscapeChars:        function(){return tabSettings[6];},
    getTableType:          function(){return tabSettings[7];},
    getCaption:            function(){return tabSettings[8];},
    getPlacementSpecifier: function(){return tabSettings[9];},
  };
};
var getDatumSettingsFromArray = function (datumSettings){
  return {
    getRangeName:     function(){return datumSettings[0];},
    getFullPrecision: function(){return datumSettings[3];},
    getSep:           function(){return datumSettings[4];},
    getColumnSwap:    function(){return datumSettings[5];}
  };
};
var getSettingsFromArray = function (array){
// Settings that are common for the tables and data
// It is really needed, it is not only a "shortcut"
  return {
    getRangeName:     function(){return array[0];},
    getFolderPath:    function(){return array[1];},
    getExtention:     function(){return array[2];}
  };
};

var getNotes = function(){
    return {
    getGeneralDefaultsNotes : function(){return [
      ['General Settings below', 'Version\nUsed to detect settings sheet generated by an older version of the Add-on that can be incompatible.'],
      ['Named Ranges that identify ranges to be exported as Latex table should end like this.\n\nPossible values:\n.<Any string>\n\nNote: The dot, ".", is imperative!'],
      ['Named Ranges that identify ranges to be exported as Data text files should end like this.\n\nPossible values:\n.<Any string>\n\nNote: The dot, ".", is imperative!'],
      ['When exporting a single table or data use the user settings if the selected range matches any of the Named Ranges in the Settings Sheet.\nThis may slow down the export so you can disable it here.\n\nPossible values:\nTRUE - Use user settings when available.\nFALSE - Just export using default settings and prompt for output file path.']
    ];},
    getTabsHeaderNotes : function(){return [
    ['Settings for each range to be exported as Latex table.'],
      [null,
'UNIX like folder path in your Drive.\n\nValid paths:\n\
\"/\" - Drive root\n\
\"./\" - This spreadsheet folder\n\.\
\"../\" - Parent folder of this spreadsheet folder\n\n\
Note: new folders are created if do not exist.',

'Output text file extension.\n\n\
Hint: using \".txt\" makes it possible to open the file directly in the Drive.',

'Produce different styles of table, existing templates are:\n\n\
Horizon\n\
      _____\n\
           \n\
      _____\n\n\
Barcode\n\
      |    |    |\n\
      |    |    |\n\
      |    |    |\n\n\
Grid\n\
     ______\n\
     |_|_|_|_|\n\
     |_|_|_|_|\n\
     |_|_|_|_|\n\n\
Manual\n\n[THE NAMED RANGE MUST NOT INCLUDE ANY CELLS ON LINE 1 OF THE SHEET!]\n\nManually control your table by adding a column to the right of a Named Range with the explicit commands to use (e.g. \\hline). Note: If you want the command to appear before the first line, you have to insert it on the row above your range.',

'Aditional option for each template choosen. Change this value to some integer X to customize the template:\n\n\
Horizon & Barcode: Add an additional horizontal line below row X\n\n\
Grid: Set X to 0 to remove the outer borders',

'Setting this field to TRUE includes a small space below and above each horizontal line, useful when you have exponents or indices in your table, as this tend to overlap with the lines.',

'Special latex characters that you want to get printed,\n\
e.g. to escape all special latex characters "&%$#_{}~^\\".',

'Valid table types are,\n\
tabular\n\
tabularx\n\
longtable\n\
table/tabular\n\
table/tabularx\n\n\
longtable features: the first cell on the 2 rows following the Named Range can be used to replace \"Continued on/from ...\"',

'Set caption/label for longtable and table\n\
Set to \'default\' to use the sheet Name as the caption for your table \n\
or \'your custom table caption title\' \n\
or simply leave this field empty for no caption \n\
',
'Table float placement specifier\n\
Only relevant for \"table/tabular\" and \"table/tabularx\" table types.\n\
E.g. [], [!h], [htb]'
      ]
    ];},
    getTabDefaultNotes : function(){return [
      ['This is the default settings for a table.\n\nThey are used when you click \"'+getDevSettings().getMenuLabels()['singleTable']+'\" AND are also copied below for each new Named Range that is added for table export.']
    ];},
    getDataHeaderNotes : function(){return[
    ['Settings for each range to be exported as Data text file.'],
      [null,
       'UNIX like folder path in your Drive.\n\nValid paths (comarination may be used):\n/ - Drive root\n./ - This spreadsheet folder\n\../ - Parent folder of this spreadsheet folder\n\nNote: new folders are created if do not exist.',
       'Output text file extension.\n\nHint: using \".txt\" makes it possible to open the file directly in the Drive.',
       'Choose to export with full numbers precision or just the displayed values.\n\nPossible values:\nTRUE\nFALSE.',
       'The character(s) used as data columns separator.\n\nPossible values:\nspace\ntab - a.k.a. \"\\t\"\nenter - a.k.a. "\\r\\n\"\nLF - a.k.a. \"\\n\"\nCR - a.k.a. \"\\r\"\n<Any string>',
       'Optionally swamp or omit columns in the corresponding range.\n\nPossible values:\nFALSE - do nothing\ncX[cY...] - e.g. \"c1c3c1c4\" will only output columns 1,3,1 and 4 in this order. Column counting in the Named Range starts with \'1\'.'
      ]
    ];},
    getDatumDefaultNotes : function(){return [
      ['This is the default settings for a Data.\n\nThey are used when you click \"'+getDevSettings().getMenuLabels()['singleData']+'\" AND are also copied below for each new Named Range that is added for data export.']
    ];}
  };
};

var getNextPageContinue =  function(continue_next){
  if (continue_next.length === 0 ){
    continue_next = "Continued on next page";
  }
  return "{r}{\\textit{"+continue_next+"}} \\\\ \n";
};
var getPreviousPageContinue =  function(continue_previous){
  if (continue_previous.length === 0 ){
    continue_previous = "Continued from previous page"
  }
  return "\{\\tablename\ \\thetable\ -- \\textit{"+continue_previous+"}} \\\\ \n";
};

var getTableTypeError = function(tableType){
  if (tableType){
    return [[tableType +' is not a valid Table Type.\nUse : tabular, tabularx or longtable.']];
  }else{
    return [['Table Type not defined.\nUse : tabular, tabularx or longtable.']];
  }
};
