scene.onOverlapTile(SpriteKind.Projectile, assets.tile`poison pit`, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    simplified.gravity_jump(mySprite)
    if (respawnInvincibility) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`jump_invincible`,
        150,
        false
        )
    } else {
        animation.runImageAnimation(
        mySprite,
        assets.animation`jump`,
        150,
        false
        )
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`blank`, mySprite, 0, 0)
    animation.runImageAnimation(
    projectile,
    assets.animation`splode`,
    100,
    false
    )
    pause(1000)
    projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
    if (mySprite.overlapsWith(projectile)) {
        info.changeLifeBy(-1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), true)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), assets.tile`bounce`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (respawnInvincibility) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walk left invincible`,
        150,
        false
        )
    } else {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walk left`,
        150,
        true
        )
    }
})
info.onCountdownEnd(function () {
    respawnInvincibility = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`orange bauble`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (respawnInvincibility) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walk right_invincible`,
        150,
        false
        )
    } else {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walk right`,
        150,
        true
        )
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`skyblock`, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest2`, function (sprite, location) {
    game.splash("Level 3")
    scene.setBackgroundImage(assets.image`background3`)
    tiles.setCurrentTilemap(tilemap`level3`)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    2000,
    false
    )
})
info.onLifeZero(function () {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest1`, function (sprite, location) {
    game.splash("Level 2!")
    scene.setBackgroundImage(assets.image`background2`)
    tiles.setTilemap(tilemap`level2`)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    2000,
    false
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest0`, function (sprite, location) {
    game.over(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`poison pit`, function (sprite, location) {
    if (!(respawnInvincibility)) {
        game.splash("Oh no, you lost a life :(")
        info.startCountdown(3)
        respawnInvincibility = 1
        info.changeLifeBy(-1)
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, assets.tile`transparency16`)
        mySprite.setImage(assets.image`respawnbubble`)
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`bounce`, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
let projectile: Sprite = null
let respawnInvincibility = 0
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
tiles.setTilemap(tilemap`level1`)
game.splash("Monkey jump!")
game.showLongText("Collect the orange bubbles for points and avoid poison mushrooms", DialogLayout.Bottom)
game.showLongText("Use A to place bouncy crates and B to blast away objects", DialogLayout.Bottom)
mySprite = sprites.create(assets.image`stand`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
info.setLife(3)
