var tipuesearch = {"pages": [{'title': 'About', 'text': '網際 Coppeliasim 手冊與虛實整合手足球系統 \n Web-based Coppeliasim Manual and Cyber-Physical Foosball System \n 專題動機: \n 探討如何利用網際內容管理系統架構, 讓 Coppeliasim 用戶手冊, 得以更加容易進行資料附加與應用, 擬藉此提升課程教學與專題研究效益. \n 專題成員: \n 50733120 \n 50833101 \n 50833106 \n 50833112 \n 初步完成內容: \n https://mde.tw/pjcopsim', 'tags': '', 'url': 'About.html'}, {'title': '參考資料', 'text': '網際 CoppeliaSim 用戶手冊管理系統 \n Web-based CoppeliaSim user manual management system \n 專題動機 \n 從  https://github.com/CoppeliaRobotics/helpFiles  可以取得 CoppeliaSim 套件各版次的最新技術手冊資料, 在 github Pages 進行配置後, 可建立  https://mde.tw/copsimdoc/  網站, 若使用者希望能夠針對各版本靈活運用這份技術資料, 並隨著各種功能的研究與運用流程, 配合加入客製化案例與延伸說明時, 就必須設法透過網際內容管理的模式進行修改. \n 相關技術探討 \n https://github.com/cyberbotics/webots  的技術手冊採用 Markdown 格式編寫, 透過  https://github.com/showdownjs/showdown  即時轉為 html, 由於文檔內容以 Github 倉儲管理, 因此即時轉檔加上倉儲內容的版次發布功能, 可以直接在 Github Pages 網站擷取各套件版次對應的技術手冊內容. \n 至於 CoppeliaSim 在  https://github.com/CoppeliaRobotics/helpFiles  倉儲中並未揭露其技術手冊編輯與管理流程, 但從其使用 iframe 配置技術手冊的網頁架構, 且採用 Google 搜尋進行內容關鍵字查詢的情況來看, 應該是採用 html 檔案編輯工具進行內容維護後, 再提交推送至  https://github.com/CoppeliaRobotics/helpFiles  倉儲. \n 研究方法 \n 從現有技術面而言,  https://github.com/cyberbotics/webots  利用 Markdown 轉 html 的方式, 最易於管理網頁資料, 但  https://github.com/CoppeliaRobotics/helpFiles  並無原始 Markdown 資料, 因此若希望採用 Webots 的技術手冊管理流程, 勢必要先將 html 轉為 Markdown 進行編輯配置後, 再轉回易於管理與配置的網站系統. 過程中最大的問題是 Markdown 對於圖檔縮放所提供的彈性, 較 html 低, 一般為了頁面效果, 會混用 Markdown 與 html 標註 (例如: Pelican 網誌系統), 此舉將增加文檔編輯過程中解決衝突時的難度. \n 針對目前  https://github.com/CoppeliaRobotics/helpFiles  網站檔案皆為 html 的情況, 直接採用網際 html 編輯系統與 Github Pages 進行管理, 應該是最可行的方案. \n 研究流程 \n 假如要將  https://github.com/CoppeliaRobotics/helpFiles  納入 cmsimde 網際內容管理系統的架構進行配置, 首先必須取得其  https://mde.tw/copsimdoc/  網頁左側的 html 階次. 也就是從 wb_tree.html 檔案中, 根據各 htm 檔案引用時 div 標註中的 id 進行階次判斷: \n 首先, 可以利用 bs4 取得 wb_tree.html 中各 div 標註的 id 數列: \n from bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\n\nsoup = BeautifulSoup(data, \'html.parser\')\n\n#finding the div with the id\nids = [tag[\'id\'] for tag in soup.select(\'div[id]\')]\n  \nprint(ids) \n 第二種方法, 也可以取出各 div 標註的 id 內容: \n from bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\n\nsoup = BeautifulSoup(data, \'html.parser\')\n\nfor ID in soup.find_all(\'div\', id=True):  \n    print(ID.get(\'id\')) \n 接著必須取得各 div 標註中 anchor 標註的超文件 text 資料, 也就是  https://mde.tw/copsimdoc/  網頁左側, 各連結的字串, 分別對應到 href 連結的 .htm 檔案名稱: \n from bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\n\nsoup = BeautifulSoup(data, \'html.parser\')\n\n# get anchor under div, and print text\nfor a in soup.select(\'div a[href]\'):\n    print (a.text)\n \n 接下來, 為了同時列出各 div 標註的 id 與其中對應的 href 連結 .htm 檔案名稱, 使用 zip() 進行迴圈處理: \n from bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\n\nsoup = BeautifulSoup(data, \'html.parser\')\n\ncount = 0\nfor i in zip(soup.find_all(\'div\', id=True), soup.select(\'div a[href]\')):\n    count += 1\n    print(i[0].get(\'id\'), i[1].text)\nprint("total html:" + str(count))\n# 主要 .htm 檔案有 57 個\n \n 從上一個程式的執行, 可以發現列在  https://mde.tw/copsimdoc/  網頁左側的 .htm 網頁有 57 個, 且 div id 採用 folder.x.x.x 的格式進行設定, folder.x 可以對應到 cmsimde 的 H1 頁面, folder.x.x 則對應 H2 頁面, 而 folder.x.x.x 則對應到 H3 頁面. \n 接著則將 div id, page_title, page_location 分別讀出後, 放入 list 中, 以便後續能根據頁面階次, 逐一讀出各 htm 檔案的內容, 並放入 cmsimde 的動態網站 config/content.htm 中: \n from bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\n\nsoup = BeautifulSoup(data, \'html.parser\')\n\ncount = 0\npage_info = []\nfor i in zip(soup.find_all(\'div\', id=True), soup.select(\'div a[href]\')):\n    count += 1\n    # folder, page_title, page_location\n    #print(i[0].get(\'id\'), i[1].text, i[1][\'href\'])\n    page_info.append([i[0].get(\'id\'), i[1].text, i[1][\'href\']])\nprint("total html:" + str(count))\nprint(page_info)\n# 主要 html 只有 57 個 \n 其他專題流程, 根據上述程式的測試, 已知可以利用 cmsimde 將  https://github.com/CoppeliaRobotics/helpFiles  倉儲中的標題 .htm 轉入 config/content.htm 檔案後, 直接利用動態網頁進行編輯管理, 但原始 CoppeliaSim 網頁中的圖檔與相對 href 連結則必須設法轉為 cmsimde 動態網頁的格式. \n 參考程式如下: \n # 必須要先將原 htm 中的 h1, h2 與 h3 全部換為 h4 之後再轉檔\n# 請注意, wb_tree.html 中的特定 .htm 區段並沒有採用統一的 id 註記標號\n# 這裡可能要手動檢查與處理\nfrom bs4 import BeautifulSoup\nwith open("wb_tree.html") as f:\n    data = f.read()\nsoup = BeautifulSoup(data, \'html.parser\')\n\ndef readFile(path):\n    """Read file content by given path\n    """\n    with open(path, encoding="utf-8") as f:\n        data = f.read()\n        # 嘗試在此將所有 .htm 連結改為 .html\n        data = data.replace(".htm", ".html")\n        \n        # h1, h2 and h3 replaced with h4\n        data = data.replace("<h1>", "<h4>")\n        data = data.replace("</h1>", "</h4>")\n        data = data.replace("<h2>", "<h4>")\n        data = data.replace("</h2>", "</h4>")\n        data = data.replace("<h3>", "<h4>")\n        data = data.replace("</h3>", "</h4>")\n        # 修改 <img src="images/ 為 <img src="./../images/\n        data = data.replace(\'<img src="images/\', \'<img src="./../images/\')\n    return data\n    \n    return data\n    \ndef getBody(path):\n    """Get html body content by given file path\n    """\n    soup = BeautifulSoup(readFile(path), \'html.parser\')\n    body = soup.find(\'body\')\n    # get body content without body tag\n    return str(body.findChildren(recursive=False))\n    \ndef pageLevel(id):\n    # 利用 folder 字串切割 anchor 中的 name 屬性, 藉以判斷其階次\n    \'\'\'\n    最前段的 name 屬性\n    link0folder.0\n    link1folder\n    link2folder\n    link3folder\n    link4folder\n    link5folder\n    link6folder.1\n    link7folder.1\n    link8folder.1.1\n    \'\'\'\n    levelStr = id.split("folder")[1]\n    length = len(levelStr)\n    if length == 2:\n        return 1\n    elif length == 4:\n        return 2\n    elif length == 0:\n        return 4\n    else:\n        return 3\n        \ndef makePage(pageList):\n    body = getBody(pageList[2])\n    #print(body)\n    if pageLevel(pageList[0]) == 1:\n        content = "<h1>" + pageList[1] + "</h1>" + body[1:-1]\n    elif pageLevel(pageList[0]) == 2:\n        content = "<h2>" + pageList[1] + "</h2>" + body[1:-1]\n    elif pageLevel(pageList[0]) == 3:\n        content = "<h3>" + pageList[1] + "</h3>" + body[1:-1]\n    else:\n        content = "<h4>" + pageList[1] + "</h4>" + body[1:-1]\n    return content\n    \ncount = 0\npage_info = []\n\'\'\'\nfor i in zip(soup.find_all(\'div\', id=True), soup.select(\'div a[href]\')):\n    count += 1\n    # folder, page_title, page_location\n    #print(i[0].get(\'id\'), i[1].text, i[1][\'href\'])\n    page_info.append([i[0].get(\'id\'), i[1].text, i[1][\'href\']])\n\'\'\'\nfor i in soup.select(\'div a[href]\'):\n    count += 1\n    #print(i[\'name\'])\n    # need to remove "/" in i.text\n    #second = i.text.replace("/", "")\n    # 嘗試將 i[\'href\'] 去掉 en/ 與 .htm 作為頁面標題, 看是否可以讓原先的連結直接生效\n    second = i[\'href\'].replace("en/", "")\n    second = second.replace(".htm", "")\n    page_info.append([i[\'name\'], second, i[\'href\']])\n    #print(i[\'name\'], i.text)\n#print("total html:" + str(count))\n#print(page_info)\n# 修正 wb_tree.html 中的 div 位置後, html 總數為 177 個\n# 因為每一個 div 中有多個 htm 檔案, 因此不能以 div 界定而要以 div 中的 a 中的 name 界定頁面 level\n#first = [\'link0folder.0\', \'CoppeliaSim User Manual\', \'en/welcome.htm\']\n#print(readFile(first[2]))\n#print(getBody(first[2]))\ncontentHtml = ""\nfor i in page_info:\n    eachPage = makePage(i)\n    contentHtml += eachPage\nprint(contentHtml)\n \n 一旦 CoppeliaSim 納入 cmsimde 網際內容管理系統後, 參與協同管理者, 就可以利用動態網頁處理衝突後, 轉為靜態網頁進行 Github Pages 的靜態網頁配置, 並利用關鍵字搜尋, Pelican 與 Reveal 的網誌及簡報進行與 CoppeliaSim 有關的功能與案例介紹, 其中包含各版次延伸程式的編譯與後續應用研究. \n 上述專題研究可以分為: \n part1: CoppeliaSim 技術手冊網際內容管理系統配置 (技術類別: Python 與 Flask 網際程式應用, Leo Editor 作為 IDE) \n part2: CoppeliaSim 系統與延伸模組編譯 (技術類別: Msys2/C++/Lua/Python Programming 應用, Leo Editor 作為 IDE) \n part3: CoppeliaSim 應用案例研究 (技術類別: NX12, NX2206, Solvespace, Onshape, CoppeliaSim, Lua, Python, Leo Editor 作為 IDE, 基本 MCAD 或 Reinforcement Learning 延伸應用) \n CoppeliaSim 場景利用 Arudino script 執行虛擬控制:  https://bitbucket.org/afaina/horosim.git \n HoRoSim (Holistic Robotic Simulator) allows you to  simulate physical devices controlled by Arduino code . The user defines standard electronic circuits that are employed in the Arduino code (see  Hardware Setup function ) and a robot simulator, CoppeliaSim, simulates the physics of the device. Thus, HoRoSim simulates Arduino code with a physics engine and based on the electronic circuits defined. You can use the Arduino IDE to compile the code and run it, see instructions bellow.  The simulator has been described in this  article , which has been published on the 13th International Conference on 2021 Robotics in Education conference. Cite: Faiña A. (2022) HoRoSim, a Holistic Robot Simulator: Arduino Code, Electronic Circuits and Physics. In: Merdan M., Lepuschitz W., Koppensteiner G., Balogh R., Obdržálek D. (eds) Robotics in Education. RiE 2021. Advances in Intelligent Systems and Computing, vol 1359. Springer, Cham.  https://doi.org/10.1007/978-3-030-82544-7_24 \n 應用案例: \n Application of deep reinforcement learning for control problems.pdf \n 利用 uStepper STL 零件做為參考, 自行在 NX12 與 NX2027 中進行零組件設計組立後, 轉入 CoppeliaSim 建立 uStepper.ttm, 以及後續應用. \n https://github.com/uStepper/uStepper-RobotArm-Rev3 \n uStepper Robotic Arm STL files \n ustepperArmKinematics.pdf \n ustepper_Instructions.pdf \n References:  https://www.stlfinder.com/3dmodels/ustepper/ \n 過程中需要利用 Python GUI 建立控制套件, 可利用  https://beeware.org/  ( https://github.com/beeware )製作. \n Computer Aided Design and Reinforcement Learning: \n https://www.youtube.com/watch?v=FgzM3zpZ55o \n https://www.youtube.com/watch?v=dhEF5pfYmvc \n 2008  Stochastic Approximation: A Dynamical Systems Viewpoint \n 2018  Fastest Convergence for Q-Learning', 'tags': '', 'url': '參考資料.html'}, {'title': 'cmsimde', 'text': 'https://mde.tw/pj5083  倉儲位於  https://github.com/mdecycu/pj5083 , 利用  cmsite  作為 Template 建立, 以  cmsimde  作為子模組. \n 具有管理權限的用戶, 可以利用 putty 在 Windows 操作系統中建立 .ppk Private key, 與 Github 帳號中的 SSH 格式 Public key 對應後, 即可利用 git 將帶有子模組的倉儲內容取下後進行內容維護. \n 假設在近端的 putty sesssion 名稱為 mdecycu, 則取下帶有子模組的倉儲有以下兩種方法: \n 直接取下倉儲與子模組內容: \n git clone --recurse-submodules git@mdecycu:mdecycu/pj5083.git \n 先取下主倉儲內容, 再取下子模組內容: \n git clone git@mdecycu:mdecycu/pj5083.git \n git submodule update --init --recursive \n 之後, 假如 cmsimde 子模組內更新, 而 pj5083 倉儲也希望將子模組 cmsimde 更為最新版, 則可使用: \n cd cmsimde \n git pull origin master \n 以上指令必須在 pj5083 的倉儲目錄中執行, 表示要先更換目錄到 cmsimde, 然後以 git pull 至 cmsimde 倉儲中取下 master 分支中的資料, 這裡的 origin 指登錄在子模組中倉儲所在位置的 URL. \n \n \n \n \n', 'tags': '', 'url': 'cmsimde.html'}, {'title': 'Brython', 'text': 'ROC 國旗規格   PROC 國旗規格   USA 國旗規格 \n Gist Brython scripts \n 解題練習 \n Cango \n \n \n \n \n  for ggame  \n \n \n \n \n \n \n \n \n  Cango 程式庫  \n \n \n \n \n \n \n \n \n  for Konva 程式庫  \n \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n add 1 to 100 p261 ROC flag PROC flag USA flag Draw Grid Random Rect Rect Walk Rect U Walk Rect rev U Walk 單節貪食蛇 5 個紅點方塊 Snake BSnake auto_guess ball bezier big_lotto brython_kw bunny cango_spur cango_spur1 cango_three_gears clear clock convert_temp deepmerge display_stl draw ex1 ex2 ex3 ex4 fibo fourbar guess_a_number hw1_1 hw1_2 Keycode knova1 merge3 power_lotto spur spur_w_form stl_binary_ascii stl_writer Tetris turtle1 turtle2 turtle3 turtle4 turtle5 turtle6 turtle7 turtle8 twl_link_ik webcam websocket ycqsort \n  ######################  editor1 開始 ######################  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n  這裡的畫布 id 為 brython_div  \n \n  graphics-column is for ggame  \n \n  ######################  editor1 結束 ######################  \n  以下可以開始利用 editor1 的設定編寫對應 Brython 程式  \n \n  以上為內建程式, 頁面可透過 ?src=gist_url 執行  \n  add 1 to 100 開始  \n \n', 'tags': '', 'url': 'Brython.html'}]};