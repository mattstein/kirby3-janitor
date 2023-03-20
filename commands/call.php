<?php

declare(strict_types = 1);

if (!class_exists('Bnomei\Janitor')) {
	require_once __DIR__ . '/../classes/Janitor.php';
}

use Bnomei\Janitor;
use Kirby\CLI\CLI;

return [
	'description' => 'Call a job-like method on a model',
	'args' => [
		'method' => [
			'longPrefix' => 'method',
			'description' => 'Name of the method on the model',
			'castTo' => 'string',
			'required' => true,
		],
	] + Janitor::ARGS, // page, file, user, site, data, model
	'command' => static function (CLI $cli): void {
		$method = $cli->arg('method');
		$result = [
			'status' => 500,
		];

		$model = null;
		if ($cli->arg('site')) {
			$model = $cli->kirby()->site();
		} elseif (!empty($cli->arg('page'))) {
			$model = $cli->kirby()->page($cli->arg('page'));
		} elseif (!empty($cli->arg('file'))) {
			$model = $cli->kirby()->file($cli->arg('file'));
		} elseif (!empty($cli->arg('user'))) {
			$model = $cli->kirby()->user($cli->arg('user'));
		}

		if ($model) {
			if (method_exists($model, $method)) {
				if (empty($cli->arg('data'))) {
					$result = $model->$method();
				} else {
					$result = $model->$method($cli->arg('data'));
				}
			} else {
				$result['message'] = t('janitor.method-not-found', 'Method "' . $method . '" could not be called on model of class <' . $model::class . '>.');
			}
		} else {
			$result['message'] = t('janitor.model-not-found', 'No model provided');
			$cli->error('No model provided. Use `--page`, `--file`, `--user` or `--site`.');
		}

		(A::get($result, 'status') === 200 ? $cli->success($model::class . '->' . $method) : $cli->error($model::class . '->' . $method));
		$cli->out(print_r($result, true));

		janitor()->data($cli->arg('command'), $result);
	}
];
