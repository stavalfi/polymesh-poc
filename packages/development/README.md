# Development

CSM = Cloud System Manager

Development and CLI tools for Singer.

This package is a set of CLI tools to manipulate both Redis streams and K8s.

The main commands are:

## Redis manipulation:

- # List all keys

  yarn redis-cli-execute keys '\*'

- # List all big keys
  yarn redis-cli-execute --bigkeys

# List all entries in "devk8s::rb-game-id::1530610::messages" stream

yarn redis-cli-execute XREAD COUNT 100 STREAMS "devk8s::rb-game-id::1530610::messages" 0-0

# Idle time in seconds for "devk8s::rb-game-id::1530610::messages" stream

yarn redis-cli-execute OBJECT IDLETIME "devk8s::rb-game-id::1530610::messages"

# Size in bytes for storing "devk8s::rb-game-id::1530610::messages" stream

yarn redis-cli-execute MEMORY USAGE "devk8s::rb-game-id::1530610::messages"

# Show names of all molly register requests streams

yarn redis-cli-execute SCAN 0 TYPE stream COUNT 10000 MATCH '_register_requests_'

# Show names of all molly register responses streams

yarn redis-cli-execute SCAN 0 TYPE stream COUNT 10000 MATCH '_register_responses_'

# Show names of all pool session streams

yarn redis-cli-execute SCAN 0 TYPE stream COUNT 10000 MATCH '_pool_'

# Delete a redis stream with given name

yarn redis-cli-execute DEL "molly_register_responses_for_molly_crawler_instantiated_at_2021_12_02_15_49_29_499Z"
