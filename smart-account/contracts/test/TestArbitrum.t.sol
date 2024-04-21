// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import "@tetrationlab/dilithium/contract/Dilithium.sol";
import "@tetrationlab/dilithium/contract/Packing.sol";

contract SimpleQuasarAccount {
    Dilithium immutable dilithium;
    Packing immutable packing;

    constructor(Dilithium _dilithium, Packing _packing) {
        dilithium = _dilithium;
        packing = _packing;
    }

    function publicKey() public view returns (Dilithium.ExpandedPublicKey memory) {
        return dilithium.expand(
            packing.unpack_pk(
                hex"bffcb5c690b21065e119332bc80846710e238d5a766721093de16498322988fa2c7b213f3b8562ad4716dc6eb17847e547e4676845e92ebc73707eef76e6fc819e0db06a0c5f0ce9054bfb2d087b6676ad4423d62abd367e4b406b24996ca719f15e46e2694ddfd39546d5536f8d42bb4e211b4fe16da9644f6877acadb23bed598a9c6dd518c77e552eed912e5383c1fe09b64a5b9bfa33568444c6fe61d91a23d0098c834dcea6a8a732e3b166f98a427d42234b86d30f3b03d50c4154f1cd6fb6790fdfc5bdb24a65a881c21799e252de87ff6c25fe82e9c056398c0b2d1b4cf6d4de9960ea1960fab4b1a4eb859ebae47789af3f0999aad3a2a2a31900df26f69b1b7c222bfd81694e847fcbafee2700392b96a3530f4bbd13b00391bd149fec606fc67d3db5b1611d3c2b30dc18726b03ab34ebdb804a19d9e7e6ab6c5d52199a9d4b495375eac582e150153d3f96441f20fd4fa3e5b821ce4ddb47dafb36e9f32220a75d7f37b4fd6f9973d9000fcc5c3e6fb73f52c62dc54729d969a8a93dd6de75d15b25fd120ec198df0b7b33b351ed5f73510bc9b132d4bd4e976dfc6737de99df41fe03e4802b3b755ea7b3bd46433cad77ae03405993eff79bd3f6b4951c8f728eb2d34c5be9cfd8912cd172a8927b3d7dfe9b7d6e72fef486606bf683e59a067aad6fa5e2016509086776da8bc314b4e8b2aef5f3d76cfb77787ccbd82e5555b09b96dc5ed1022293472db9b99ea2c2f5f28fa4c9ae5854fe655c95437754ad3a652d3434b7d3fe66e0dd24449d20aa08d532392b3f6c524ee71bd856291bff88617156220dca5c1e950aad977734df199b18d4e6e53b6589e0b487b9fa74f3564e04356ac3536f1e7c41454d2b7c7336c31c83765d294813bfae26dfc6f09f53aec761b0176fc2b6b64553e491cc44f94f144f26034897c0f436f99701d660e6aaeac7dca72869a5748648341c136576ebd1f90a0c350595d126a6a0b543371dab66dec6546a5be068567a074758781649be95a76180e463f51aa5ee247bac3015f966d094aa86c6e501e04821da56359614ddca3b77865c55e3f0661b7411c77ae012fd4fab1a6310d66a9dafc7a834d6befd1c416fa8215f0f37c0af59ef69407f5165724276dab5479cdff60888735b19201979ccdf5ed2ee05bd56342dfb80e2e91e3bcb6614e8b7a591db9ca8faa88055b041a9f5c729603d77afbda9891bf97738a61a5224bef5efe9b5f9723c51e82268effdc6a47323eea87658bc974f6b22f4a694e7f70899eccfde3984d362bed818f8502362260a7ddceedeb40a4a424d7adafceabe11795b730629ac8f61bc567abd3eb0fca20bbd85782615e4143423fadd6dbfe5a7622bc5422cbb0e17b3ce63a25f1224ac174f0b7e89c95c7e0c0f81de70db4828ec47489bbad6c55c0f1ba2f09cd02a7dff3a4688a65a36bc11f6e90034ccf9a3b0fa57e1eda85c4a3acc5a3cabb231f81d23c127fdc2d9b1529c23269202cdd5c547a27d633d3d3515ed779796b76b2347572fb2bf39c197beb905379e01f3bbdf9aedda17f70f22a3365fbeb9f58e22a08125d56a0fe4bf3762260945ae9f01726780d6abcd6751cb11bb2c6976fbc59548fac6403737beab7f4897e1f2f05a81658e7138c4516d476824860290e42e6fbfacf02b59aaae030ad3d8f1733434005c8fa27241576422c7a399e60f70396039edb63fa346cc5bc7fe38824234404d4e5d15e15b882db0c5aaee19ac61394c8058375e2d927dba8ecb82e2d9377d7c7499f90498cffcb2b52cf368597df26808e0f0a9e19e35302d309da9f91b810b715ac4aac5f0d1e6e5cb731420858b"
            )
        );
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function verify(bytes calldata signature, bytes32 message) public view returns (bool) {
        Dilithium.ExpandedPublicKey memory epk = publicKey();
        Dilithium.Signature memory sig = packing.unpack_sig(signature);
        return dilithium.verifyExpanded(sig, epk, bytes.concat(message));
    }

    function execute(address dest, uint256 value, bytes calldata func, bytes calldata signature) external {
        require(verify(signature, keccak256(abi.encode(dest, value, func))), "Invalid signature");
        _call(dest, value, func);
    }

    receive() external payable {}
}

contract TTest is Test {
    SimpleQuasarAccount _account;

    // Dilithium _dilithium;
    // Invntt _invntt;
    // Ntt _ntt;
    // Polynomial _poly;
    // PolynomialVector _polyVec;
    // Packing _packing;
    // Stream _stream;

    function setUp() public {
        // _ntt = new Ntt();
        // _invntt = new Invntt();
        // _stream = new Stream();
        // _poly = new Polynomial(_ntt, _stream);
        // _polyVec = new PolynomialVector(_ntt, _invntt, _poly);
        // _packing = new Packing(_poly);
        // _dilithium = new Dilithium(_poly, _polyVec, _packing);
    }

    function testAA() public {
        SimpleQuasarAccount acc = SimpleQuasarAccount(payable(0xe29D99D407b2840FE799ED7d51344Fc46A5b7086));
        vm.prank(0x7F711Be6936C1CbE98bD4E3270dd3e2EFf04E0F1);
        acc.execute(
            address(0x4B0897b0513fdbEEC7c469d9aF4FA6C0752abea7),
            0 ether,
            "",
            hex"e43827e214668562b3bfc7efb79f4d189bc35638580dd1daba4b71a89af174c94e8beb5e57694a2eb3ff5434e3db88617b09979613466e2f66613cea889d9182f2208ee2884087615fe26f5c94e2193db190977f3d0b08c37618a28beebef3c74b6e23540f5d816cffe9ee75c68c284ee737ac1a0e96692f33757d62cf34acb635f3a009732878d097349e40557c55bc5e5244b8e296dbcf5eccdb25561c93fe3b330354e21002a3af8c9944290d1eacad378f949c6c7f5072d530426f2b7ab51b5c1da4e43fbda17ad94fd31db670df25c9a8e7ddeae1d4a8d6b475bf95117317bdbd34d01fd88a8fdc9b626392134fde0d67c44d00b47c73223ded7cb7241d619289267dbac88620ca42b47d8310e3c4b42d6309a55005f10efbac5b634e02675894c2950cad96125fd82a1c63dda6f3941b405334762ee5ac637a558db3d7ef225c4356567f2b96d5ee1cf9207ef59e41ba1a875fc0d36239cc00daeaadc27a4952828af56c0a00290c7f0bdd88eca902fd880492220c312a21c0c580d30eff88975165924d1e70e791ecb3a9042372aec60430f1a49c9ea0717e4fed1cd69032e1fb1b743f4d7008f0a81ebcb3f805f4f56ed97bee39f83a02365bd0d6cde5dcc5247d3c3810e3d2fac169aa4daeeeab346603d1c737fb35a00fc9e81016a1ea901704f9f45794cfbc5e29f022dbe14df93ce994760598888e3ab8165029c9a6085958bdf1fdc1858126675367c8a503d46a12be6181c67a320f954e71b44c10941295cd7c20b551dbd951b25452ebe9baad89573c1dc454a3cd28e6c3b9f9bdd825865f3fb54af30a5cefe39b109dbc6a6a49a0f74394437b8698100305cf2ba1e57aba983143000502cc30a7a924d182396653946300c764c08a83b239c3f498efd444bdfa1f9e0d978a5f8d1499e858183275fef2c37902a864fecc8f3abd4db118ad58e76a50d28a8a3d517d13026724eda093644f1508520f9c630bb0af5b63d750098b818055e534801e2c7a868692b8c2c6317311625a4c7d640dfb56acf48c69770da223725b8dc716cae6529e60c9bfb047aa224ef1f3a9c0567566e8c6d3645f43fd6f2358ef84a37157d48eed893b6d3c78c282f1845b5e18346a4dcc111f9aa96fd50be897d20c3fa2ef9a87c8dd674618c78a632f818c6f965538f8ed7d491ad9148356984d79884c3190ad2010a86d9542bd145d463b4ab81a880f6c088186a5219fdc4b24660fabe80f372ef6efb530badae7eb3eaad9e52784795c282846725db6023a9c73b07614f99b70ec606c8ac97130882e40537d0f3f16eedddb4a4a3217eba903bd1f8f3f075fb57ad219c7bfb86cd1062011cf3ca56d40655f428cd8f19263ccb67c451e72f84e65ea061d5bfe5a3d087afdcc02ddd3655c6b035da841ea110308e5d63406463d135842c8445d038126ea83ba2518f775f20582cfc7f4ef2054ae2ea85952be86f5fc2712516e74318deb02965f5708780fb5d95aa8ac8b8b0f92c80fa1a802de5154f55239aa091bb93bc9f40fc29e60c388047653e89ddfbbff416a606cbc66188fd8afd5508034f5942167fc789ea72ecf6b1c4b43c039da174ee8a6db68302e16634ab4ce09b724c47366447bccf92bfae3c5db14611ffb5db03bec641ec4ddac0b03ba312df9143e0d5582bb8f5b67d7f5b4e5e53e5543781733262a0a263969893e4268986a09a1093a521cf4db5c635c45eeba9f47fafa9d0d27230a8932a3581c5abff27b1d29c0cdc49783a031b7a2c6d5d5162442734f4cf76bf1a621aaa64370b0b5d0a38db020ea97e593a3a88501314a7fc1d3988e945b2ce1ba418fb5c4a4f6e5c34d3044fd11bf16553b474d9a62b563ac057c7b0867f3bd9116948911f0fe0ba34ce3807b9189fc81fe0d3fc7b197674cae8f569e97f6a52491fc842190fc6b35662dc492fb0e8029b700f98e1dd953fe0141dd9e69f170b4ddd9e9c9ab145b6386f1b2b454e297dfde2520575c81dd9a0a643c5de90c11cd432bb409fd03c17a14d38e8a4482cb90a53b64dc63b7f217a966c5f4dd4effc27dca176561bc36b572c132b27559b9a29241bf92881d1fb0d6bf065cf1926e5550a552df2902ec9b90d8329ddeff8ef530f475892b892ce318d2d437eb82dcb421e56f9760d2e76db811901e725c92db62b6f8ed7b4cdf0923e142a2884914f9a0b31f7d2e0af3e8834a754d002302523f20605e71829cfffb6e79db4f36f109a4753ab87d1e758ce887dc5bad94253f386003369b55841aa5657aadac1ba1bd1c254d0da35735eab6ac9593d3436f151497884204bf754e9691a61f6d7c2c87afd29ee683f96951de72530e74581219a7dd1e861ed30b11c654172b21c0938a998c11cb99a2c00844821e0fad922ba1c4446a832f23b12e160cc2ecc4de6be7e48d0bbefd55d947515c1d4f5adfce47cabc256f7d96813b594d3fd4e7723df9175cfa1d2050047b2abba00793dead6b625323e6df4ce8e1d0da5136a6acd1fc42a393be0b057ca5769cb3dabbbecb73dc6c38e362d1f29f2b9389697ee60a0e0f1510a61aebfc549213d01000ea6719656db02ffb3023f7e56a0454c794f7df58a589fa6691537a89d68c97c7cc5a368a2b3d6a0b771ab90c35cd393c40997a16ae9fe003c76e7d6f4802b416249598ff2a729615d67332036b9aa0ab52dd9706ecdd009fbef623080bae8711ee3143cee21d27416696e9c6bb58591a2149d4e84651f7a013badbbadf1955e7adeed8eeedca6b73172165d97410721982c37418163280e4ded59311d809f2573f1b604e49853a9c0d94a500f98f148b4fa4f9a55f7a4a56bdc6571fafa592af5732d7a9920518841854cabc1de2daa8579b96970f20cf93016edd0c0dcdd26249a708d33ce34bfc0759d2b3aa33a2790e4d6205ed74218b3aff917c4c51edcfcdefe939c1a87a0ea0ab7c61153fe81491b0bb1565bcbc98950d9364be0141c95434884049c1ef1f0b676a0cbf575fa4987ca356fc6ee0dbd9a8b95ffe9d26d4bf725c1006f7291413bc5f281d52652321c141c6e165935dd0b05f78a3d3a37b2fa14b5df990da2a7d31dc333a0c21969f978a6251a89d41fdefd7e9ee53e1676c9e39c1367fc4f263a2b949bfc802039fccdfefd563d9e4a5230426ad84cf34c63ff99eeecc75d48911c5752b4011607e8a5fde6aa5de90585b2d58f6f02ec27db5260003bd1fe4b214db2d23b78569317580bf48ad6fd0904c616e62886b90000704bd971caeb9f4136fcdebd3ac56b7ef905e8256fe8b9e3ddc92f2110c204076787b7d818b97a1cdcee0eaef07181e21262c509da4a9aecddcf10a0f13141c232d2f494e51535866687c909ca7b4b7d800091f244255818e9da1a4b2c7d1f200000000000000000000000000101e3443"
        );
    }
}