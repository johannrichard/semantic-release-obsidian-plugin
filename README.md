# semantic-release-obsidian-plugin

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to handle updating Obsidian plugin metadata.

| Step               | Description                                 |
| ------------------ | ------------------------------------------- |
| `verifyConditions` | Verify required metadata files are present. |
| `prepare`          | Update metadata files with new version.     |

## Install

```bash
$ npm install brianrodri/semantic-release-obsidian-plugin --save-dev
```

## Usage

The plugin can be configured in the [`semantic-release` configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "brianrodri/semantic-release-obsidian-plugin"
    ],
    "tagFormat": "${version}"
}
```

> [!IMPORTANT]
> The `tagFormat` must be set to `${version}` to ensure that releases follow Obsidian's versioning scheme.

When `semantic-release` runs, this plugin will update the following files according to Obsidian's versioning scheme:

- `package.json`
- `package-lock.json`
- `manifest.json`
- `manifest-beta.json`
- `versions.json`

## Beta Release Support with BRAT

When running `semantic-release` on a pre-release branch (e.g. `beta`), the plugin updates only `manifest-beta.json` and `versions.json` with the updated version number for this pre-release, preserving `manifest.json`. This enables [BRAT](https://github.com/TfTHacker/obsidian42-brat) compatibility.

To make BRAT detect your beta versions, choose one approach:

- **Manual Beta Sync**

    - After each beta release, copy `manifest-beta.json` to your default branch
    - Requires manual intervention but maintains standard branch structure

- **Beta Branch as Default**
    - Set `beta` as your default GitHub branch
    - Beta releases are automatically detected
    - Requires syncing `manifest.json` from release branches back to `beta`
