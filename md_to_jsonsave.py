import re

def markdown_to_html_custom(markdown_text):

    # 1. 转义
    def escape_html(text):
        text = text.replace("&", "&amp;")
        text = text.replace("<", "&lt;")
        text = text.replace(">", "&gt;")
        text = text.replace("\"", "&quot;")
        text = text.replace("'", "&#39;")
        return text

    # 2. ```code``` => <pre><code>code_escaped<br></code></pre><br>
    def replace_code_blocks(match):
        lang = match.group(1) # language, currently unused but good to capture
        code_content = match.group(2)

        escaped_code = escape_html(code_content)
        escaped_code = escaped_code.replace('\n', '<br>')

        return f'<pre><code>{escaped_code}</code></pre><br>'

    markdown_text = re.sub(r'```(\w*)\n(.*?)```\n*', replace_code_blocks, markdown_text, flags=re.DOTALL)

    # 3. ## text => <h2>text</h2><br>
    markdown_text = re.sub(r'##\s*(.*?)\n+', r'<h2>\1</h2><br>', markdown_text)

    # 4. **text** 或 __text__ => <b>text</b>
    markdown_text = re.sub(r'\*\*(.*?)\*\*|__(.*?)__', r'<b>\1\2</b>', markdown_text)

    # 5. `code` => <code>code</code>
    def replace_inline_code(match):
        code = match.group(1)
        return f'<code>{escape_html(code)}</code>'
    markdown_text = re.sub(r'`(.*?)`', replace_inline_code, markdown_text)

    # 6. 多个换行符 => <br><br>
    markdown_text = re.sub(r'\n\n+', '<br><br>', markdown_text)

    # 7. 处理单个换行符：将剩余的单个换行符转换为 <br>
    markdown_text = markdown_text.replace('\n', '<br>')

    markdown_text = re.sub(r'^(<br>)+', '', markdown_text)
    markdown_text = re.sub(r'(<br>)+$', '', markdown_text)


    final_html = f'"{markdown_text}"'

    return final_html


if __name__ == '__main__':

    print("""
        1.确保markdown文件与该文件处于同一目录下或提供正确路径
        2.输入的文件名应当类似：name.md，后缀不可省略
    """)

    try:
        filename = input("Name:").strip()

        with open(filename, 'r', encoding='utf-8') as f:
            markdown_content = f.read()

        html_output = markdown_to_html_custom(markdown_content)

        print(html_output)

    except FileNotFoundError:
        print(f"错误：'{filename}' 文件未找到，或者错误的文件名")
    except Exception as e:
        print(f"发生错误：{e}")